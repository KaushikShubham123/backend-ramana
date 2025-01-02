const db = require('../models');
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY;
const UpdateProfile = db.updateprofile;


// Middleware to authenticate token and decode user info
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Access token is missing or invalid' });

  try {

    const decoded = await jwt.verify(token, TOKEN_KEY);

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp < currentTime) {
      return res.status(401).json({ error: "Token has expired" });
    }

    console.log({ decoded })

    req.userId = decoded.userid; // Attach decoded user ID to the request object
    req.useremail = decoded.email;


  } catch (err) {
    console.log(err);

    res.status(403).json({ message: 'Token is invalid or expired' });

  }
  next(); // Pass control to the next middleware or route handler

};

// Function to create a new profile
const createUpdateProfile = async (data) => {
  const { firstName, lastName, mobile, email, dob, city, country, zipCode, address, userId } = data

  // Using req.userId set by authenticateToken middleware

  const newProfile = await UpdateProfile.create({
    userId: userId,
    firstName,
    lastName,
    mobile,
    email: email,
    dob,
    city,
    country,
    zipCode,
    address

  });
  return newProfile;

};

const updateProfile =async(data)=>{

  const { firstName, lastName, mobile, dob, city, country, zipCode, address, userId } = data
    // Fetch existing profile by userId
    const existingProfile = await UpdateProfile.findOne({where:{ userId}});

    // if (!existingProfile) {
    //   throw new Error("Profile not exist, fill all fields.");
    // }

    // Update only provided fields
    if (firstName !== undefined) existingProfile.firstName = firstName;
    if (lastName !== undefined) existingProfile.lastName = lastName;
    if (mobile !== undefined) existingProfile.mobile = mobile;
    if (dob !== undefined) existingProfile.dob = dob;
    if (city !== undefined) existingProfile.city = city;
    if (country !== undefined) existingProfile.country = country;
    if (zipCode !== undefined) existingProfile.zipCode = zipCode;
    if (address !== undefined) existingProfile.address = address;

    // Save the updated profile
    await existingProfile.save();


     return existingProfile;

}


const getupdateProfile = async (req, res) => {
  const data = await UpdateProfile.findOne({ where: { userId: req.userId } });
  res.status(200).json({ data: data });
}



module.exports = {
  authenticateToken,
  createUpdateProfile,
  updateProfile,
  getupdateProfile
};



// / var db = require('../models');
// const jwt = require('jsonwebtoken');
// const TOKEN_KEY = process.env.TOKEN_KEY
// // const { validCategories } = require('../constant');
// const UpdateProfile = db.updateprofile;

// //to decode token
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"

//   if (!token) return res.status(401).json({ message: 'Access token is missing or invalid' });

//   jwt.verify(token, TOKEN_KEY, (err, decoded) => {
//     if (err) return res.status(403).json({ message: 'Token is invalid or expired' });

//     req.userId = decoded.id; // Attach the decoded user ID to the request object
//     // return req.userId;
//     next();
//     // Pass control to the next middleware or route handler
//     return authenticateToken
//   });
// };

// //To create new form
// const createupdateProfile = async (data, authenticateToken) => {
//   const { firstName, lastName, mobile, email, dob, city, country, zipcode, address } = data




//   const newForm = await UpdateProfile.create({
//     userId: authenticateToken.req.userId,
//     firstName,
//     lastName,
//     mobile,
//     email,
//     dob,
//     city,
//     country,
//     zipcode,
//     address

//   });

//   return newForm;
// }





//To get forms



// module.exports = {
//   authenticateToken,
//   createupdateProfile,
//   getupdateProfile


// }