const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')


router.post("/forgetpassword", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw Error("An email is required.")

    }
    const createdPasswordResetOtp = await userCtrl.sendPasswordResetOtpEmail(email);
    res.status(200).json(createdPasswordResetOtp);

  }
  catch (error) {
    res.status(400).send(error.message);
  }
}
);

router.post("/reset", async (req, res) => {
  try {
    let { email, otp, newPassword } = req.body;
    if (!(email && otp && newPassword)) {
      throw Error("Empty crediantials are not allowed");
    }
    await userCtrl.resetUserPassword({ email, otp, newPassword })
    res.status(200).json({ email, passwordreset: true })
  }
  catch (error) {
    res.status(400).send(error.message);
  }


})
module.exports = router;