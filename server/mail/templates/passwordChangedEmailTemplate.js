const passwordChangedEmailTemplate = ({ userName, supportEmail }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Changed</title>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0"
          style="
            background-color:#020617;
            border-radius:12px;
            margin:40px 0;
            padding:30px;
          "
        >

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="color:#22c55e; margin:0; font-size:26px;">
                ✅ Password Updated
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="color:#e5e7eb; font-size:16px; margin:0;">
                Hi <strong>${userName}</strong>,
              </p>
              <p style="color:#cbd5f5; font-size:15px; margin-top:8px;">
                This is a confirmation that your account password was changed successfully.
              </p>
            </td>
          </tr>

          <!-- Info Box -->
          <tr>
            <td style="background-color:#020617; border:1px solid #1e293b; border-radius:8px; padding:16px;">
              <p style="color:#94a3b8; font-size:14px; margin:0;">
                🔐 If you made this change, no further action is required.
              </p>
              <p style="color:#94a3b8; font-size:14px; margin-top:6px;">
                ⚠️ If you did <strong>not</strong> make this change, please contact our support team immediately.
              </p>
            </td>
          </tr>

          <!-- Support CTA -->
          <tr>
            <td align="center" style="padding:24px 0;">
              <a
                href="mailto:${supportEmail}"
                style="
                  background-color:#ef4444;
                  color:#ffffff;
                  padding:12px 26px;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                  font-size:14px;
                  display:inline-block;
                "
              >
                Contact Support
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1e293b; padding-top:20px;">
              <p style="color:#94a3b8; font-size:12px; margin:0;">
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

module.exports = passwordChangedEmailTemplate;
