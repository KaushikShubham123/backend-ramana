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

const getupdateProfile = async (req, res) => {
  const id = req.params.id;

  const data = await UpdateProfile.findOne({ where: { id } });
  res.status(200).json({ data: data });
}



module.exports = {
  authenticateToken,
  createUpdateProfile,
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