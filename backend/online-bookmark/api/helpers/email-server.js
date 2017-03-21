const nodemailer = require('nodemailer');
const emailConfig = require('../../../../online-bookmark-config/email.json');
const swaggerConfig = require('yamljs').load('./backend/online-bookmark/api/swagger/swagger.yaml');
const { encrypt, decrypt } = require('../helpers/crypto');

const smtpConfigUrl = `smtps://${emailConfig.username}@gmail.com:${emailConfig.password}@smtp.gmail.com`;
const smtpTransport = nodemailer.createTransport(smtpConfigUrl, {
    service: 'Gmail',
    auth: {
        user: emailConfig.username,
        pass: emailConfig.password
    }
});

module.exports = {
    sendMailVerificationLink
};

function sendMailVerificationLink(user, token) {
    let textLink = `http://${swaggerConfig.host}/${emailConfig.verifyEmailUrl}/${token}`;
    let from = `${emailConfig.accountName} Team ${emailConfig.username}>`;
    let mailbody = `
        <p>Thanks for Registering on ${emailConfig.accountName} </p>
        <p>Please verify your email by clicking on the verification link below.
            <br/>
            <a href="${textLink}">Verification Link</a>
        </p>`;
    mail(from, user.email , 'Account Verification', mailbody);
}

function mail(from, email, subject, mailbody) {
    let mailOptions = {
        from,
        to: email, // list of receivers
        subject,
        html: mailbody
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.error(error);
        }
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}
