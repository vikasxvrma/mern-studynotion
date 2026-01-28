const enrollmentEmailTemplate = ({ userName, courses, dashboardUrl }) => {
  const courseList = courses
    .map(
      (course) => `
        <tr>
          <td style="padding:10px 0; font-size:15px; color:#e5e7eb;">
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
  <title>Enrollment Confirmation</title>
</head>

<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#020617; border-radius:12px; margin:40px 0; padding:30px;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h1 style="color:#facc15; margin:0; font-size:28px;">
                🎉 Enrollment Successful!
              </h1>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding-bottom:20px;">
              <p style="color:#e5e7eb; font-size:16px; margin:0;">
                Hi <strong>${userName}</strong>,
              </p>
              <p style="color:#cbd5f5; font-size:15px; margin-top:8px;">
                You’re officially enrolled in the following course(s). Welcome to your learning journey 🚀
              </p>
            </td>
          </tr>

          <!-- Course List -->
          <tr>
            <td style="background-color:#020617; border:1px solid #1e293b; border-radius:8px; padding:16px;">
              <table width="100%">
                ${courseList}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:30px 0;">
              <a href="${dashboardUrl}"
                style="
                  background-color:#facc15;
                  color:#020617;
                  padding:14px 28px;
                  text-decoration:none;
                  border-radius:8px;
                  font-weight:bold;
                  font-size:16px;
                  display:inline-block;
                ">
                Start Learning Now →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #1e293b; padding-top:20px;">
              <p style="color:#94a3b8; font-size:13px; margin:0;">
                If you have any questions, feel free to reach out to our support team.
              </p>
              <p style="color:#64748b; font-size:12px; margin-top:8px;">
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

module.exports = enrollmentEmailTemplate;
