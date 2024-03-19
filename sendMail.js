// Import the required modules
const nodemailer = require('nodemailer');

// Function to send the email
async function sendMail(formData) {
    // Create a Nodemailer transporter using SMTP
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'ola.stoltenberg20@ethereal.email',
            pass: 'vxX52GjnENWsd9Wyjy'
        }
    });

    // Email content
    let mailOptions = {
        from: formData.email,
        to: 'pthphung02@gmail.com', // Recipient email address
        subject: 'Message from Portfolio Site',
        text: `Name: ${formData.fname} ${formData.lname}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email: ' + error);
        return false;
    }
}

module.exports = sendMail;
