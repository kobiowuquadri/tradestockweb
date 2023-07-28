const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            //host:,
            service:"gmail",
           // port: 587,
            secure: true,
            auth: {
                user:process.env.NODEMAILER_USER,
                pass:process.env.NODEMAILER_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log('eamil has been sent successfully')
    }
    catch(err){
       console.log(err, "email not sent")
    }
}
//sendEmail()

module.exports = sendEmail