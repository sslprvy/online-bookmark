const DB = require('./db-connection');
const { verifyToken } = require('./crypto');

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
        .then(() => {
            next();
        })
        .catch(err => {
            res.status(401).json({ message: err });
        });
};
