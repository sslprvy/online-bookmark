const DB = require('../helpers/db-connection');
const { verifyToken, decodeToken, generateToken } = require('../helpers/crypto');
const { sendMailVerificationLink } = require('../helpers/email-server');
const { pick } = require('../helpers/common');

module.exports = {
    verifyEmail,
    resendVerificationEmail
};

function verifyEmail(req, res) {
    const token = req.swagger.params.token.value;

    DB.connect().then(db => {
        db.collection('users')
            .findOne({ token, isVerified: false })
            .then(user => {
                if (!user) {
                    throw new Error(`Couldn't find entry in database`);
                }

                return Promise.all([user, verifyToken(user.token)]);
            })
            .then(([user, payload]) => {
                return db.collection('users')
                    .findOneAndUpdate({ token }, { $set: { isVerified: true }});
            })
            .then(() => {
                res.json({ message: 'Success' });
                db.close();
            })
            .catch(err => {
                res.status(400).send({ message: err.message });
                db.close();
            });
    });
}

function resendVerificationEmail(req, res) {
    const token = req.swagger.params.token.value;
    const user = pick(decodeToken(token), 'username', 'password', 'email');
    const newToken = generateToken(user);

    DB.connect().then(db => {
        db.collection('users')
            .findOneAndUpdate({ token, isVerified: false }, { $set: { token: newToken }})
            .then(({ value: user }) => {
                if (!user) {
                    res.status(400).json({ message: `Couldn't find entry in database` });
                    return;
                }

                sendMailVerificationLink(user, newToken);
                res.json({ message: 'Success' });
                db.close();
            })
            .catch(err => {
                res.status(500).json({ message: err.message });
                db.close();
            });
    });
}
