const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'jazmin.bednar1@ethereal.email',
    pass: 'Pnatb7JHAJMfkN1KQ3'
  }
})

function makeAnEmail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello!</h2>
      <p>${text}</p>
    </div>
  `;
}

export async function sendPasswordResetemail(resetToken: string, to: string) {
  const emailInfo = await transport.sendEmail({
    to,
    from: "test@example.com",
    subject: "Your password reset email",
    html: makeAnEmail(`This is your password reset token, 
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">click the link to reset your password</a>`)
  });
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(emailInfo));
}
