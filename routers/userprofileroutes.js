const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')


router.post("/userprofile", async (req, res) => {
  let {
    retailerName, mobile,
    contactNo,
    outletAddress, latitude, longitude, followUpDate, leadPhase, newImage } = req.body;

  if (!(mobile)) {
    throw Error("Empty crediantials are not allowed");
  }
  const newUserProfile = await userCtrl.userProfile({
    retailerName,
    mobile,
    contactNo,
    outletAddress, latitude, longitude, followUpDate, leadPhase, newImage
  });
  res.status(200).json(newUserProfile);

})
module.exports = router;