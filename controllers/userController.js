var db = require('../models');
const User = db.user;
const Otp = db.otp;
const UserProfile = db.userProfile;
// const Vendor = db.vendor;
const CompanyDetails = db.vendorcompanydetails;
const generateOTP = require('../utiity/generateOtp');
const sendEmail = require('../utiity/sendemail');
const { hashData, verifyingHashedData } = require('../utiity/hashData');
const createToken = require('../utiity/createToken');
// const { where } = require('sequelize');
// const { use } = require('../routers/authroutes');
// const vendor = require('../models/vendor');
// const { where } = require('sequelize');


var getUser = async (req, res) => {

  const data = await User.findAll();
  res.status(200).json({ data: data });

}

// for creating new user
const createNewUser = async (data) => {
  const { email, userType, mobile, password } = data;


  let existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User with the provided email already exists")
  }

  // existingUser = await User.findOne({ where: { mobile } });
  // if (existingUser) {
  //   throw new Error("User with the provided contact number already exists")
  // }
  // if (existingUser.email && existingUser.mobile) { throw Error("User with given email and mobile already exists") }

  else {

    const hashedPassword = await hashData(password);
    const newUser = await User.create({

      email,
      userType,
      mobile,
      password: hashedPassword,
      verified: false

    })
    // const createdUser = await newUser.save();
    return (newUser);
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

var deleteUser = async (req, res) => {

  const data = await User.destroy({
    where: { id: req.params.id }
  }
  );
  res.status(200).json({ data: data });
}



const sendOTP = async ({ email, subject, message, duration = 2, otpFormatter = (otp) => { return otp; } }) => {


  if (!(email && subject && message)) {
    throw Error("Provide Values for email,subject,message");
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
        <b>${otpFormatter(otp)}</b>
        </p>
        <p>This code <b>expires in ${duration} minute(s)</b></p>`,
  }
  sendEmail(mailOptions)
  //save OTP
  const newOTP = await new Otp({
    email,
    otp: otp,
    expiresAT: Date.now() + 60000 * 2 * +duration,
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
    // await User.destroy({ where: { email } });
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

  else {


    return false;
  }


}
const deleteOTP = async (email) => {
  await Otp.destroy({ where: { email } });

}

const verifyUserEmail = async ({ email, otp }) => {

  const validOTP = await verifyOTP({ email, otp });
  if (!validOTP) {
    throw Error("Invalid code passed.Checkyour inbox.");
    // await User.destroy({ where: { email } })
  }
  // else {
  //   await User.create({ where: { email }, verified: true })
  // }
  await User.update(
    { verified: true }, // Fields to update
    { where: { email } } // Condition to identify the user
  );
  // await User.update({ verified: true }, { where: { email } });

  await deleteOTP(email);
  return true;
}


//To reset Password
const sendPasswordResetOtpEmail = async (email) => {
  //check if an account exists
  const existingUser = await User.findOne({ where: { email } });
  if (!existingUser) {
    throw Error("There's no account for the provided email");
  }
  if (!existingUser.verified) { throw Error("Email hasn't been veriifed yet.Check your inbox.") };
  const otpDetails = {
    email,
    subject: "Password Reset",
    message: "Enter the code below to reset your password.",
    duration: 2,
    otpFormatter: (otp) => { return `http://localhost:3000/auth-pass-change?email=${email}&otp=${otp}` }
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
//UserProfile-Controller

const userProfile = async (data) => {
  const { retailerName, userid, outletAddress, latitude, longitude, followUpDate, leadPhase, /* newImage, */ mobile } = data;

  let existingUser = await User.findOne({ where: { id: userid } });
  if (!existingUser) {
    throw new Error("There's no user available for the provided user Id");
  }
  const retailerID = existingUser.id;
  
  const createdUserProfile = new UserProfile({
    salesman_id: retailerID,
    retailerName,
    contactNo: mobile,
    outletAddress,
    latitude,
    longitude,
    followUpDate,
    leadPhase,
    // newImage


  })
  const saveUserProfile = await createdUserProfile.save();
  return saveUserProfile;
}

// const getUserProfile=async()

var getUserId = async (req, res) => {
  const id = req.params.userId;
  const data = await UserProfile.findAll({ where: { salesman_id: id } });

  res.status(200).json({ data: data });

}
var getUserLeadId = async (req, res) => {
  const id = req.params.userId;
  const data = await UserProfile.findAll({ where: { id } });

  res.status(200).json({ data: data });

}

const VendorCompanyDetails = async (data) => {


  const { creatorId,
    companyName,
    companyRegisteredNumber,
    companyMobileNumber,
    companyEmailAddress,
    companyRegisteredDate,
    companyAddress,
    companyCity,
    companyCountry,
    companyZipcode,
    video } = data;

  // const vendorExists = await Vendor.findOne({ where: { mobile } })
  // if (vendorExists) { throw Error("Vendor exists with provided contact number"); }
  // let existingUser = await User.findOne({ where: { mobile } });

  // if (!existingUser) {
  //   throw Error("There's no user available for the provided contact number");
  // }
  // let userInUserProfile = await UserProfile.findOne({ where: { contactNo: mobile } });
  // if (!userInUserProfile) { throw Error("There's no user profile  available for the provided contact number in User Profile"); }

  const createdCompanyDetails = new CompanyDetails({
    creatorId,
    companyName,
    companyRegisteredNumber,
    companyMobileNumber,
    companyEmailAddress,
    companyRegisteredDate,
    companyAddress,
    companyCity,
    companyCountry,
    companyZipcode,
    video
  })

  const saveUserProfile = await createdCompanyDetails.save();

  return saveUserProfile;
}

var getVendorCompanyDetails = async (req, res) => {

  const data = await CompanyDetails.findAll({ where: { creatorId: req.userId } });

  res.status(200).json({ data: data });

}



var deleteVendorCompanyDetails = async (req, res) => {

  const data = await CompanyDetails.destroy({
    where: { id: req.params.id }
  }
  );
  res.status(200).json({ data: data });
}




module.exports = {
  getUser,
  deleteUser,
  sendOTP,
  verifyOTP,
  verifyUserEmail,
  sendPasswordResetOtpEmail,
  createNewUser,
  authenticateUser,
  resetUserPassword,
  userProfile,
  getUserId,
  getUserLeadId,
  VendorCompanyDetails,
  getVendorCompanyDetails,
  deleteVendorCompanyDetails

}
