const contactUserTemplate = ({ userName, message }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact Confirmation</title>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0"
          style="background-color:#020617; border-radius:12px; margin:40px 0; padding:30px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="color:#facc15; margin:0;">
                📩 Message Received
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td>
              <p style="color:#e5e7eb; font-size:16px;">
                Hi <strong>${userName?userName:"user"}</strong>,
              </p>

              <p style="color:#cbd5f5; font-size:15px;">
                Thank you for contacting <strong>StudyNotion</strong>.
                We’ve received your message and our team will get back to you shortly.
              </p>
            </td>
          </tr>

          <!-- User Message -->
          <tr>
            <td style="background-color:#020617; border:1px solid #1e293b; border-radius:8px; padding:16px; margin-top:10px;">
              <p style="color:#94a3b8; font-size:14px; margin-bottom:6px;">
                Your message:
              </p>
              <p style="color:#e5e7eb; font-size:14px; margin:0;">
                ${message}
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:20px; border-top:1px solid #1e293b;">
              <p style="color:#94a3b8; font-size:13px; margin:0;">
                We appreciate your patience and look forward to helping you.
              </p>
              <p style="color:#64748b; font-size:12px; margin-top:6px;">
                © ${new Date().getFullYear()} StudyNotion • Built with ❤️ by Vikas
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;
};

module.exports = contactUserTemplate;
