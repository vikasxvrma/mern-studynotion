const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true only for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, // ⬅ prevents hanging
    });
    console.log("SMTP CONFIG CHECK", {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER ? "present" : "missing",
  pass: process.env.SMTP_PASS ? "present" : "missing",
});


    const info = await transporter.sendMail({
      from: `"StudyNotion" <no-reply@studynotion.com>`,
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
