
const emailConfig = require('../Config/Email');
const nodemailer = require('nodemailer');
const util = require('util');

let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});


exports.send = async (options) => {
    const emailOptions = {
        from: 'RecruiterMania <noreply@recruitermania.com>',
        to: options.user.Email,
        subject: options.subject,
        html: options.html
    }

    const sendMail = util.promisify(transport.sendMail, transport);
    return sendMail.call(transport, emailOptions);
}