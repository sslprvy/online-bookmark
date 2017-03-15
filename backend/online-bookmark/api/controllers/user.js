const DB = require('../helpers/db-connection');
const { sendMailVerificationLink } = require('../helpers/email-server');
const { generateToken } = require('../helpers/crypto');

module.exports = {
    createUser
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
