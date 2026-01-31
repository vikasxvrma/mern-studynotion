const axios = require("axios");

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: "imvikas1027@gmail.com", // can be ANY email, no verification needed
        },
        to: [
          {
            email: email,
          },
        ],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    console.log("Mail sent via Brevo API:", response.data.messageId);
    return response.data;
  } catch (error) {
    console.error(
      "MAIL API ERROR (ignored):",
      error.response?.data || error.message
    );
    return null; // never crash API
  }
};

module.exports = mailSender;
