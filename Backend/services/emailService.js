const nodemailer = require('nodemailer');
const config = require('./../config/email.config');

// Replace with your SMTP server and credentials
const smtpConfig = {
    host: config.smtpOptions.host,
    port: config.smtpOptions.port, // Default SMTP port (587 for TLS, 465 for SSL, 25 for non-secure)
    secure: false, // Use TLS
    auth: {
        user: config.smtpOptions.auth.user,
        pass: config.smtpOptions.auth.pass,
    },
};


// Create a nodemailer transporter
const transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function (error, success) {
    if (error) {
        console.error('SMTP server connection error:', error);
    } else {
        console.log('SMTP server is connected.');
    }
});

// Function to send an email
async function sendEmail(mailOptions) {
    try {
        const info = await transporter.sendMail({
            from: config.emailFrom, // Sender's email address
            to: mailOptions.toEmail, // Recipient's email address
            subject: mailOptions.subject, // Subject of the email
            text: mailOptions.text, // Plain text body of the email
            html: mailOptions.html, // html body of the email
        });

        console.log('Email sent:', info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
}

module.exports = {
    sendEmail,
};
