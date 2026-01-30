// contactController.js
// Business logic for "Contact Us" page: store visitor message and send an acknowledgement email.

const contactUserTemplate = require("../mail/templates/contactUserTemplate");
const Visitor = require("../models/Visitor");
const mailSender = require("../utils/mailSender");

const contactUs = async (req, res) => {
  try {
    // 1) Fetch incoming data from request body
    const { firstName, lastName, email, message, phone } = req.body;

    // 2) Validate required fields
    if (!firstName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // 3) Create a new Visitor document in DB
    const newVisitor = await Visitor.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    // 4) Try to send an acknowledgement email (best-effort)
    // Use a separate try/catch so email failure doesn't break the main response
    try {
       mailSender(
        email,
        "📩 We Received Your Message – StudyNotion",
        contactUserTemplate({
          firstName,
          message,
        }),
      );
      console.log("Acknowledgement email sent to visitor:", email);
    } catch (mailErr) {
      // Log the error but continue — user message is already saved
      console.error("Error sending acknowledgement email to visitor:", mailErr);
    }

    // 5) Return success response
    return res.status(200).json({
      success: true,
      message: "Thanks for contacting us. We will revert back soon!",
      data: newVisitor,
    });
  } catch (error) {
    console.error("contactUs error:", error);
    return res.status(500).json({
      success: false,
      message:
        "There was an error while sending your message. Please try again later.",
    });
  }
};

module.exports = { contactUs };
