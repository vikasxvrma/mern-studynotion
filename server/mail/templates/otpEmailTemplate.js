const otpEmailTemplate = ({ userName, otp, expiryMinutes = 5 }) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
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
                🔐 OTP Verification
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
                Please use the One-Time Password (OTP) below to verify your email address.
              </p>
            </td>
          </tr>

          <!-- OTP Box -->
          <tr>
            <td align="center" style="padding:24px 0;">
              <div
                style="
                  background-color:#020617;
                  border:2px dashed #facc15;
                  border-radius:10px;
                  padding:18px 32px;
                  display:inline-block;
                "
              >
                <span
                  style="
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:6px;
                    color:#facc15;
                  "
                >
                  ${otp}
                </span>
              </div>
            </td>
          </tr>

          <!-- Expiry Info -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <p style="color:#94a3b8; font-size:14px; margin:0;">
                This OTP is valid for <strong>${expiryMinutes} minutes</strong>.
              </p>
              <p style="color:#64748b; font-size:13px; margin-top:6px;">
                Do not share this code with anyone.
              </p>
            </td>
          </tr>

          <!-- Security Note -->
          <tr>
            <td style="background-color:#020617; border:1px solid #1e293b; border-radius:8px; padding:14px;">
              <p style="color:#cbd5f5; font-size:13px; margin:0;">
                ⚠️ If you did not request this verification, please ignore this email.
                Your account will remain secure.
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

module.exports = otpEmailTemplate;
