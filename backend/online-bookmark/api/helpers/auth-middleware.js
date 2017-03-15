const DB = require('./db-connection');
const { verifyToken, generateToken } = require('./crypto');
const { pick } = require('../helpers/common');

const authExceptions = ['/user/login', 'verifyEmail/{token}', 'resendVerificationEmail/{token}'];

module.exports = function checkAuthorization(req, res, next) {
    // we are not checking the token for the above urls
    if (authExceptions.includes(req.originalUrl)) {
        next();
        return;
    }

    if (!req.headers.authorization && !req.headers.Authorization) {
        res.status(401).json({ message: 'Unathorized' });
        return;
    }

    const token = req.headers.authorization || req.headers.Authorization;

    verifyToken(token)
        .then((decoded) => {
            DB.connect().then(db => {
                const user = pick(decoded, 'username', 'email', 'password');
                const newToken = generateToken(user);
                db.collection('users')
                    .findOneAndUpdate({ token }, { $set: { token: newToken }})
                    .then(() => {
                        res.setHeader('authorization', newToken);
                        next();
                    })
                    .catch(() => {
                        next();
                    });
            });
        })
        .catch(err => {
            res.status(401).json({ message: err });
        });
};
