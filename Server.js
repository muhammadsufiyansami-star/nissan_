const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve static files
app.use(cors());
app.use(bodyParser.json());

// Configure Nodemailer with Gmail App Password
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "muhammadsufiyansami@gmail.com",           // Your Gmail
        pass: "eglo ivzt jhgw jvgd"               // 16-digit Gmail App Password
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, ""));
});

app.post("/send", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: "YOUR_GMAIL@gmail.com",          // Where you want to receive messages
        subject: "New Contact Form Message",
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ success: false, error });
        }
        return res.send({ success: true });
    });
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
