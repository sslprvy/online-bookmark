const DB = require('./db-connection');
const { verifyToken, generateToken, decodeToken } = require('./crypto');
const { pick } = require('../helpers/common');
const { expiryThreshold } = require('../../../../online-bookmark-config/jwt.json');

const authExceptions = ['/user/login'];
const verifyEmailUrlPartial = '/verifyEmail';
const resendVerificationEmailUrlPartial = '/resendVerificationEmail';

module.exports = {
    checkAuthorization,
    allowCrossDomain
};

function checkAuthorization(req, res, next) {
    // we are not checking the token for the above urls
    if (authExceptions.includes(req.originalUrl) ||
        req.originalUrl.includes(verifyEmailUrlPartial) ||
        req.originalUrl.includes(resendVerificationEmailUrlPartial)) {
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
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);

            DB.connect().then(db => {
                db.collection('users')
                    .findOne({ token }, { isVerified: 1 })
                    .then(user => {
                        // token is not in the database
                        if (!user) {
                            throw new Error('unathorized');
                        }
                        if (user.isVerified) {
                            // if there is less then 5 minutes left from the token
                            if (decoded.exp - currentTimeInSeconds < expiryThreshold) {
                                const user = pick(decoded, 'username', 'email', 'password');
                                const newToken = generateToken(user);
                                res.setHeader('authorization', newToken);
                                res.on('finish', () => {
                                    db.collection('users')
                                        .findOneAndUpdate({ token }, { $set: { token: newToken }});
                                });
                                next();
                            } else {
                                res.setHeader('authorization', token);
                                next();
                            }
                        } else {
                            throw new Error('notVerified');
                        }
                    })
                    .catch(err => {
                        if (err.message === 'unathorized') {
                            res.status(401).json({ message: 'Unathorized' });
                            return;
                        }
                        res.status(400).json({ message: 'Email is not verified' });
                        return;
                    });
            });
        })
        .catch(err => {
            res.status(401).json({ message: err });
        });
};

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    res.header('Access-Control-Expose-Headers', 'authorization');

    // intercept OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
}
