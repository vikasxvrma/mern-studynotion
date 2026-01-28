const resetPasswordEmailTemplate = ({
  userName,
  resetLink,
  expiryMinutes = 10,
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Password</title>
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
              <h1 style="color:#facc15; margin:0; font-size:26px;">
                🔐 Reset Your Password
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
                We received a request to reset your password. Click the button below to create a new one.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:24px 0;">
              <a
                href="${resetLink}"
                style="
                  background-color:#facc15;
                  color:#020617;
                  padding:14px 32px;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                  font-size:16px;
                  display:inline-block;
                "
              >
                Reset Password →
              </a>
            </td>
          </tr>

          <!-- Expiry Info -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#94a3b8; font-size:14px; margin:0;">
                This link will expire in <strong>${expiryMinutes} minutes</strong>.
              </p>
              <p style="color:#64748b; font-size:13px; margin-top:6px;">
                For your security, do not share this link with anyone.
              </p>
            </td>
          </tr>

          <!-- Security Notice -->
          <tr>
            <td style="background-color:#020617; border:1px solid #1e293b; border-radius:8px; padding:14px;">
              <p style="color:#cbd5f5; font-size:13px; margin:0;">
                ⚠️ If you did not request a password reset, please ignore this email.
                Your account remains secure.
              </p>
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

module.exports = resetPasswordEmailTemplate;
