const express = require('express')
const router = express.Router();
var db = require('../models');
const User = db.user
const CompanyDetails = db.vendorcompanydetails;
var userCtrl = require('../controllers/userController')

router.post("/vendorcompanydetails", async (req, res) => {
  try {
    const { companyName, companyRegisteredNumber, companyMobileNumber, companyEmailAddress, companyRegisteredDate, companyAddress, companyCity, companyCountry, companyZipcode, video } = req.body;

    if (!companyName && companyRegisteredNumber && companyMobileNumber && companyEmailAddress && companyRegisteredDate && companyAddress && companyCity && companyCountry && companyZipcode && video) { throw Error("Provide Mobile number"); }
    // console.log("test");


    const data = await userCtrl.VendorCompanyDetails({ creatorId: req.userId, companyName, companyRegisteredNumber, companyMobileNumber, companyEmailAddress, companyRegisteredDate, companyAddress, companyCity, companyCountry, companyZipcode, video });


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


router.patch("/existedcompanydetailsupdate", async (req, res) => {
  try {
    const {
      companyName,
      companyRegisteredNumber,
      companyMobileNumber,
      companyEmailAddress,
      companyRegisteredDate,
      companyAddress,
      companyCity,
      companyCountry,
      companyZipcode,
      video

    } = req.body;

    // Check if at least one field is provided for update
    if (
      !(
        companyName ||
        companyRegisteredNumber ||
        companyMobileNumber ||
        companyEmailAddress ||
        companyRegisteredDate ||
        companyAddress ||
        companyCity ||
        companyCountry ||
        companyZipcode ||
        video
      )
    ) 
    {
      throw new Error("Please provide at least one field to update.");
    }

    // Fetch existing profile by userId
    const existingCompanydetails = await CompanyDetails.findOne({where:{ creatorId: req.userId }});

    if (!existingCompanydetails) {
      throw new Error("Profile not found.");
    }

    // Update only provided fields
    if (companyName !== undefined) existingCompanydetails.companyName = companyName;
    if (companyRegisteredNumber !== undefined) existingCompanydetails.companyRegisteredNumber = companyRegisteredNumber;
    if (companyMobileNumber !== undefined) existingCompanydetails.companyMobileNumber = companyMobileNumber;
    if (companyEmailAddress !== undefined) existingCompanydetails.companyEmailAddress = companyEmailAddress;
    if (companyRegisteredDate !== undefined) existingCompanydetails.companyRegisteredDate = companyRegisteredDate;
    if (companyAddress !== undefined) existingCompanydetails.companyAddress = companyAddress;
    if (companyCity !== undefined) existingCompanydetails.companyCity = companyCity;
    if (companyCountry !== undefined) existingCompanydetails.companyCountry = companyCountry;
    if (companyZipcode !== undefined) existingCompanydetails.companyZipcode = companyZipcode;
    if (video !== undefined) existingCompanydetails.video = video;
    // Save the updated profile
    await existingCompanydetails.save();

    res.status(200).json({
      message: "Profile updated successfully.",
      profile: existingCompanydetails,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});


router.get('/getvendorcompanydetails', userCtrl.getVendorCompanyDetails)
router.delete("/vendorcompanydetails/:id", userCtrl.deleteVendorCompanyDetails)
module.exports = router;

