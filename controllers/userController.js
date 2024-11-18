var db = require('../models');
const User = db.user;
const Otp = db.otp;
const generateOTP = require('../utiity/generateOtp');
const sendEmail = require('../utiity/sendemail');
const { hashData, verifyingHashedData } = require('../utiity/hashData');
const createToken = require('../utiity/createToken');
// const { where } = require('sequelize');


var addUser = async (req, res) => {

  const data = await User.findAll();
  res.status(200).json({ data: data });

}

// for creating new user
const createNewUser = async (data) => {
  const { firstName, lastName, country, email, companyName, mobile, password } = data;
  let existingUser = await User.findOne({ where: { email } });
  if (existingUser) { throw Error("User with the provided email already exists"); }
  else {

    const hashedPassword = await hashData(password);
    const newUser = new User({
      firstName,
      lastName,
      country,
      email,
      companyName,
      mobile,
      password: hashedPassword

    })
    const createdUser = await newUser.save();
    return { createdUser };
  }
}

//For User sign In
const authenticateUser = async (data) => {
  const { email, password } = data;
  const fetchedUser = await User.findOne({ where: { email } });
  if (!fetchedUser) { throw Error("Invalid credentials entered") }

  const hashedPassword = fetchedUser.password;
  const paswordMatch = await verifyingHashedData(password, hashedPassword);
  if (!paswordMatch) { throw Error("Invalid password Entered"); }

  //create user token
  const tokenData = {
    userid: fetchedUser.id,
    email
  }
  const token = await createToken(tokenData);

  //assign user token
  // fetchedUser.token = token;

  return { fetchedUser, token };




}
// var postUser = async (req, res) => {
//   var postData = req.body;
//   let data;
//   if (postData.length > 1) {
//     data = await User.bulkCreate(postData)
//   }
//   else {
//     data = await User.create(postData)
//   }
//   res.status(200).json({ data: data });



// }
var deleteUser = async (req, res) => {

  const data = await User.destroy({
    where: { id: req.params.id }
  }
  );
  res.status(200).json({ data: data });
}



const sendOTP = async ({ email, subject, message, duration = 15 }) => {


  if (!(email && subject && message)) {
    throw Error("ProvideValues foremail,subject,message");
  }
  //clear any Old  
  await Otp.destroy({ where: { email } });

  //generating OTP
  var otp = await generateOTP();

  //Send EmailsendOTP
  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: email,
    subject,
    html: `<p>${message}</p>
        <p style= "color:tomato;font-size:25px,letter-spacing:2px;">
        <b>${otp}</b>
        </p>
        <p>This code <b>expires in ${duration} minute(s)</b></p>`,
  }
  sendEmail(mailOptions)
  //save OTP
  const newOTP = await new Otp({
    email,
    otp: otp,
    expiresAT: Date.now() + 60000 * 15 * +duration,
  });
  const createdOTPRecord = await newOTP.save();

  console.log(createdOTPRecord);
  return createdOTPRecord;
}


const verifyOTP = async ({ email, otp }) => {

  if (!(email && otp)) {
    throw Error("Provide value for email,otp");
  }
  const matchedOTPRecords = await Otp.findOne({
    where: { email }
  });

  if (!matchedOTPRecords) {
    throw Error("No otp records found")
  }
  const { expiresAT } = matchedOTPRecords;
  if (expiresAT < Date.now()) {
    await Otp.destroy({ where: { email } });
    throw Error("Code has expired,Request for new OTP")
  }
  const { otp: otpFromDb } = matchedOTPRecords;
  //If not expired verify the value
  // const otp =matchedOTPRecords.otp;
  if (otpFromDb == otp) {
    return true;
  }
  else { return false; }


}
const deleteOTP = async (email) => {
  await Otp.destroy({ where: { email } });

}

const verifyUserEmail = async ({ email, otp }) => {

  const validOTP = await verifyOTP({ email, otp });
  if (!validOTP) {
    throw Error("Invalid code passed.Checkyour inbox.")
  }

  await User.update({ verified: true }, { where: { email } });

  await deleteOTP(email);
  return true;
}


//To reset Password
const sendPasswordResetOtpEmail = async (email) => {
  //check if an account exists
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw Error("There's no account for the provided email");
  }
  if (!existingUser.verified) { throw Error("Email hasn't been veriifed yet.Check your inbox.") };
  const otpDetails = {
    email,
    subject: "Password Reset",
    message: "Enter the code below to reset your password.",
    duration: 1,
  }
  const createdOTP = await sendOTP(otpDetails);
  return createdOTP;
}


const resetUserPassword = async ({ email, otp, newPassword }) => {
  const validOTP = await verifyOTP({ email, otp })
  if (!validOTP) {
    throw Error("Invalid code passed.Checkyour inbox.")
  }
  //now update record with new password
  if (newPassword.length < 8) { throw Error("Password is too short") }
  const hashedNewPassword = await hashData(newPassword);
  await User.update({ password: hashedNewPassword }, { where: { email } });
  await deleteOTP(email);


  return;

}



module.exports = {
  addUser,
  // postUser,
  deleteUser,
  sendOTP,
  verifyOTP,
  verifyUserEmail,
  sendPasswordResetOtpEmail,
  createNewUser,
  authenticateUser,
  resetUserPassword
}
