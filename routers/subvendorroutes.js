const express = require('express')
const router = express.Router();
var db = require('../models');
const User = db.user
var userCtrl = require('../controllers/userController')
const generatePassword = require('../utiity/generatepassword');
const sendEmail = require('../utiity/sendemail');
// const { hashData, verifyingHashedData } = require('../utiity/hashData');

router.post("/addsubvendor", async (req, res) => {
  try {

    let { email, mobile, status } = req.body;

    if (!(email && mobile)) {
      throw Error("Empty input fields!");
    }
    // else if (!/^[a-zA-Z]*$/.test(firstName)) {
    //   throw Error("Invalid name entered")
    // }
    // else if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    //   throw Error("Invalid email entered");
    // }
    // else if (password.length < 8) {
    //   throw Error("Password is too short")
    // }
    //send otp
    const password = await generatePassword();


    // const Duration = '2';

    //good credentials, create new user 
    const createdUser = await userCtrl.createNewUser({
      email, userType: "Sub-Vendor", mobile, password
    });

    const companycreator = await User.findOne({ where: { id: req.userId } })

    createdUser.verified = true
    createdUser.vendorId = companycreator.vendorId
    createdUser.status = status
    createdUser.save();

    // const Email = 'Email';
    const message = 'Here is your password for login, reset it once you login';

    const mailOptions = {
      from: process.env.APP_EMAIL,
      to: email,
      subject: "ABC",
      html: `<p>${message}</p>
          <p style= "color:tomato;font-size:25px,letter-spacing:2px;">
          <b>Password:${password}</b>
          </p>`

    }
    await sendEmail(mailOptions);


    res.status(200).json({
      isSucces: true,
      data: createdUser

    })

  }
  catch (error) { res.status(400).send(error.message); }

})
module.exports = router;



