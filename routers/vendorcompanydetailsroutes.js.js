const express = require('express')
const router = express.Router();
var db = require('../models');
const User = db.user
var userCtrl = require('../controllers/userController')

router.post("/vendorcompanydetails", async (req, res) => {
  try {
    const { companyName, companyRegisteredNumber, companyMobileNumber, companyEmailAddress, companyRegisteredDate, companyAddress, city, country, zipCode, video } = req.body;

    if (!companyName && companyRegisteredNumber && companyMobileNumber && companyEmailAddress && companyRegisteredDate && companyAddress && city && country && zipCode && video) { throw Error("Provide Mobile number"); }
    // console.log("test");


    const data = await userCtrl.VendorCompanyDetails({ creatorId: req.userId, companyName, companyRegisteredNumber, companyMobileNumber, companyEmailAddress, companyRegisteredDate, companyAddress, city, country, zipCode, video });


    const user = await User.findOne({ where: { id: req.userId } })

    user.vendorId = data.id;
    user.save();

    res.status(200).json(data);

  }

  catch (error) {
    console.log(error);
    res.status(400).send(error.message)

  }
});

router.delete("/vendorprofile/:id", userCtrl.deleteUserProfile)
module.exports = router;

