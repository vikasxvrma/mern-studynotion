const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // 465
      secure: true, // 🔑 REQUIRED for port 465
      auth: {
        user: process.env.SMTP_USER, // apikey
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
    });

    console.log("SMTP CONFIG CHECK", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? "present" : "missing",
      pass: process.env.SMTP_PASS ? "present" : "missing",
    });

    const info = await transporter.sendMail({
      from: `"vikasworkspace-StudyNotion" <imvikas1027@gmail.com>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("MAIL ERROR (ignored):", err.message);
    return null;
  }
};

module.exports = mailSender;
