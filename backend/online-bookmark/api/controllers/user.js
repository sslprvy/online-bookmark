const DB = require('../helpers/db-connection');
const { sendMailVerificationLink } = require('../helpers/email-server');
const { generateToken, decodeToken } = require('../helpers/crypto');
const { pick } = require('../helpers/common');

module.exports = {
    createUser,
    loginUser,
    updateUser
};

function createUser(req, res) {
    DB.connect().then(db => {
        const user = req.swagger.params.user.value;
        const { email, username } = user;
        const token = generateToken(user);

        Promise.all([
            db.collection('users').findOne({ email }),
            db.collection('users').findOne({ username })
        ]).then(([userByEmail, userByName]) => {
            // TODO: on the fly validation for the given field on UI whether it is already taken
            if (userByEmail || userByName) {
                throw new Error(409);
            }

            return null;
        })
        .then(() => {
            return db.collection('users')
                .insert(Object.assign({}, user, { token, isVerified: false }))
                .then(() => true);
        })
        .then(() => {
            sendMailVerificationLink(user, token);
            res.json({ message: 'Success' });
            db.close();
        })
        .catch(err => {
            if (err.message === '409') {
                res.status(409).send({ message: 'Username, or email address in use' });
            }

            res.status(500).send({ message: `Unexpected error: ${err.message}` });
        });
    });
}

function loginUser(req, res) {
    const credentials = req.swagger.params.user.value;

    DB.connect().then(db => {
        db.collection('users')
            .findOne(credentials, { username: 1, email: 1, password: 1, _id: 0 })
            .then(user => {
                if (!user) {
                    throw new Error(`Wrong credentials`);
                }

                const token = generateToken(user);
                return [user, token];
            })
            .then(([user, token]) => {
                db.collection('users')
                    .findOneAndUpdate(user, { $set: { token }})
                    .then(() => {
                        res.json({
                            token_type: 'bearer',
                            access_token: token
                        });
                        db.close();
                    });
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
                db.close();
            });
    });
}

function updateUser(req, res) {
    const updatedUser = req.swagger.params.user.value;
    const token = req.headers.authorization;
    const user = decodeToken(token);

    DB.connect().then(db => {
        const userUpdate = db.collection('users')
            .findOneAndUpdate(
                { token },
                { $set: updatedUser },
                { returnNewDocument: true }
            )
            .then(({ value: user }) => generateToken(pick(user, 'username', 'password', 'email')))
            .then(newToken => [newToken, db.collection('users').findOneAndUpdate({ token }, { $set: { token: newToken }})])
            .then(([newToken]) => {
                res.setHeader('authorization', newToken);
            });
        let linksUpdate = Promise.resolve('done');
        let listsUpdate = Promise.resolve('done');

        // only update if the username is changed
        if (updatedUser.username && user.username !== updatedUser.username) {
            linksUpdate = db.collection('links')
                .updateMany(
                    { user: user.username },
                    { $set: { user: updatedUser.username }}
                );
            listsUpdate = db.collection('onlineBookmark')
                .updateMany(
                    { user: user.username },
                    { $set: { user: updatedUser.username }}
                );
        }

        Promise.all([userUpdate, linksUpdate, listsUpdate])
            .then(() => {
                res.json({ message: 'Success' });
                db.close();
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
                db.close();
            });
    });
}
