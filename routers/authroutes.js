const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')



//User sign Up
router.post("/signup", async (req, res) => {
  let { firstName, lastName, country, email, companyName, mobile, password } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();
  country = country.trim();
  email = email.trim();
  companyName = companyName.trim();
  mobile = mobile.trim();
  password = password.trim();

  if (!(firstName && email && country && mobile && password)) {
    throw Error("Empty input fields!");
  }
  else if (!/^[a-zA-Z]*$/.test(firstName)) {
    throw Error("Invalid name entered")
  }
  else if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    throw Error("Invalid email entered");
  }
  else if (password.length < 8) {
    throw Error("Password is too short")
  }
  else { //good credentials, create new user 
    const newUser = await userCtrl.createNewUser({
      firstName,
      lastName, country, email, companyName, mobile, password
    });
    res.status(200).json(newUser);
  }

})
//User sign IN
router.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();
  if (!(email && password)) {
    throw Error("Empty Credentials supplied");
  }

  const authenticatedUser = await userCtrl.authenticateUser({ email, password });


  res.status(200).json(authenticatedUser);

})

//user otp verification
router.post("/email", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    console.log(req.body)
    await userCtrl.sendOTP({
      email,
      subject,
      message,
      duration
    });
    res.status(200).json({
      isSucces: true,
      message: "Successfully sent otp to the provided email"
    }
    );
  }
  catch (error) {
    res.status(400).send(error.message);
  }
})
// to verify email
router.post("/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (!(email && otp)) throw Error("Empty otp details are not allowed"); {

      await userCtrl.verifyUserEmail({ email, otp });

      res.status(200).json({ email, verified: true });

    }
  }
  catch (error) {
    res.status(400).send(error.message)

  }

})

module.exports = router;