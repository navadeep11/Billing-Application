require('dotenv').config();
const nodemailer = require('nodemailer');

// Transporter for sending emails 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

// Sending Email 
const sendMail = (email,subject,message)=>{
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: message

    };
  
    transporter.sendMail(mailOptions);
}

module.exports=sendMail; 