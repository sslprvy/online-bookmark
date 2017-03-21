const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const jwt = require('jsonwebtoken');
const { privateKey, tokenExpiry }  = require('../../../../online-bookmark-config/jwt.json');

module.exports = {
    encrypt,
    decrypt,
    generateToken,
    verifyToken,
    decodeToken
};

function generateToken(payload) {
    return jwt.sign(payload, privateKey, { expiresIn: tokenExpiry });
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(decoded);
        });
    });
}

function decodeToken(token) {
    return jwt.decode(token);
}

function encrypt(payload) {
    const cipher = crypto.createCipher(algorithm, privateKey);
    let crypted = cipher.update(payload, 'utf8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
}

function decrypt(payload) {
    const decipher = crypto.createDecipher(algorithm, privateKey);
    let decrypted = decipher.update(payload, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
