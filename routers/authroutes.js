const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')
var productController = require('../controllers/productController')


// user otp verification
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body)


    const Email = 'Email';
    const Message = 'Code';
    const Duration = '2';

    await userCtrl.sendOTP({
      email,
      subject: Email,
      message: Message,
      duration: Duration
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


//User sign Up
router.post("/signup", async (req, res) => {
  try {

    let { email, mobile, password, userType } = req.body;

    if (!(email && userType && mobile && password)) {
      throw Error("Empty input fields!");
    }
    // else if (!/^[a-zA-Z]*$/.test(firstName)) {
    //   throw Error("Invalid name entered")
    // }
    else if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered");
    }
    else if (password.length < 8) {
      throw Error("Password is too short")
    }
    //send otp

    const Email = 'Email';
    const Message = 'Your code for verification is';
    const Duration = '2';

    await userCtrl.sendOTP({
      email,
      subject: Email,
      message: Message,
      duration: Duration
    });


    //good credentials, create new user 
    const createdUser = await userCtrl.createNewUser({
      email, userType, mobile, password
    });


    res.status(200).json({
      isSucces: true,
      data: createdUser

    })

  }
  catch (error) { res.status(400).send(error.message); }

})
//User sign IN
router.post("/signin", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();
    if (!(email && password)) {
      throw Error("Empty Credentials supplied");
    }

    const authenticatedUser = await userCtrl.authenticateUser({ email, password });


    res.status(200).json(authenticatedUser);
  }
  catch (error) { res.status(400).send(error.message); }

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


//To get all products

router.get('/getallproducts',productController.getAllProducts)

//To get product by id

router.get('/getproducts/:id', productController.getProductById)



module.exports = router;