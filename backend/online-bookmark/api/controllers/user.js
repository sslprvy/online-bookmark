const DB = require('../helpers/db-connection');
const { sendMailVerificationLink } = require('../helpers/email-server');
const { generateToken } = require('../helpers/crypto');

module.exports = {
    createUser,
    loginUser
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
            .findOne(credentials, { username: 1, email: 1, password: 1 })
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
            });
    });
}
