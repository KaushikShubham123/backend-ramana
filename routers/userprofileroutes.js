const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')


router.post("/userprofile", async (req, res) => {
  try {
    let {
      retailerName, mobile, userid, outletAddress, latitude, longitude, followUpDate, leadPhase, newImage } = req.body;
    if (!(userid && mobile)) {
      throw Error("Provide user Id and mobile number")
    }
    // if (!(mobile)) {
    //   throw Error("Empty crediantials are not allowed");
    // }
    const newUserProfile = await userCtrl.userProfile({
      retailerName, mobile, outletAddress, latitude, longitude, followUpDate, leadPhase, newImage, userid
    });
    res.status(200).json(newUserProfile);

  }

  catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/leads/:userId', userCtrl.getUserId)
router.get('/leads/leadId/:userId', userCtrl.getUserLeadId)
module.exports = router;