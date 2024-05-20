const express = require('express');
const contact = express.Router();
const nodemailer = require('nodemailer');
const db = require("../db/conn.js");


contact.post('/', async (req, res) => {
    const { email, message } = req.body;
    if (!email || !message) {
        console.log(email, message)
        return res.status(400).json({ error: 'Email and message are required' });
    }
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,// Port for transport layer security
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Timeless Treasures Contact Form",
            text: "Thank you for contacting us. We will get back to you as soon as possible.",
        };

        // Sending email
        await transporter.sendMail(mailOptions);

        // Saving to db
        let queryResult = await db.recieveEmail(email, message);

        // Sending response after both tasks are completed
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = contact;
