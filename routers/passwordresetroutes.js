const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')


router.post("/resetpassword", async (req, res) => {
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
module.exports = router