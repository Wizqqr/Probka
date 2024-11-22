import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();

const transport = {
    host: 'smtp.gmail.com',
    port: 465, 
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
}
}

const transporter = nodemailer.createTransport(transport)
    transporter.verify((error, success) => {
        if( error ){
            console.error(error)
        }else{
            console.log('Ready to send email')
        }
    })


// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   }
// });

export default transporter;
