const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')


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