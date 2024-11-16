const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: {
    user: process.env.APP_EMAIL,

    pass: process.env.EMAIL_PASSWORD
  },
});

transporter.verify((error, /* success */) => {
  if (error) { console.log(error); }
  else {
    console.log("Ready for messages");
    console.log("success");
  }

});

const sendEmail = async (mailOptions) => {

  await transporter.sendMail(mailOptions);
  return;


}
module.exports = sendEmail;