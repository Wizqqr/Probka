import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
dotenv.config();

const transporter = nodemailer.createTransport(SMTPTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug mode
  logger: true, // Log information to the console
}));

export default transporter;
