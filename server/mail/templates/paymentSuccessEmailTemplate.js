const paymentSuccessEmailTemplate = ({
  userName,
  amount,
  paymentId,
  courses,
  dashboardUrl,
}) => {
  const courseList = courses
    .map(
      (course) => `
        <tr>
          <td style="padding:8px 0; font-size:15px; color:#e5e7eb;">
            • ${course}
          </td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Payment Successful</title>
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
                ✅ Payment Successful
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
                Thank you for your payment! Your transaction was completed successfully.
              </p>
            </td>
          </tr>

          <!-- Payment Summary -->
          <tr>
            <td style="background-color:#020617; border:1px solid #1e293b; border-radius:8px; padding:16px;">
              <p style="color:#94a3b8; font-size:14px; margin:0;">
                <strong>Amount Paid:</strong> ₹${amount}
              </p>
              <p style="color:#94a3b8; font-size:14px; margin-top:6px;">
                <strong>Payment ID:</strong> ${paymentId}
              </p>
            </td>
          </tr>

          <!-- Courses -->
          <tr>
            <td style="padding-top:20px;">
              <p style="color:#e5e7eb; font-size:16px; margin-bottom:8px;">
                📚 <strong>Enrolled Course(s):</strong>
              </p>
              <table width="100%">
                ${courseList}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <a
                href="${dashboardUrl}"
                style="
                  background-color:#facc15;
                  color:#020617;
                  padding:14px 28px;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                  font-size:16px;
                  display:inline-block;
                "
              >
                Go to Dashboard →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1e293b; padding-top:20px;">
              <p style="color:#94a3b8; font-size:13px; margin:0;">
                If you have any questions regarding this payment, feel free to contact our support team.
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

module.exports = paymentSuccessEmailTemplate;
