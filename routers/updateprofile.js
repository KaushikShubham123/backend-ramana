const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/updateProfileController')
const db = require('../models');
const UpdateProfile = db.updateprofile;

router.post("/updateprofile", async (req, res) => {
  try {
    const { firstName, lastName, mobile, dob, city, country, zipCode, address } = req.body;
    /* 
        if (!(firstName && lastName && mobile && dob && city && country && zipcode   && address)) { throw Error('Please provide all required details'); } */
    console.log(req.body);

    const data = await userCtrl.createUpdateProfile({ userId: req.userId, firstName, lastName, mobile, email: req.useremail, dob, city, country, zipCode, address });

    res.status(200).json(data);

  }

  catch (error) {
    console.log(error.message);
    res.status(400).send(error.message)

  }
});


router.patch("/existedprofileupdate", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      dob,
      city,
      country,
      zipCode,
      address,
    } = req.body;

    // Check if at least one field is provided for update
    if (
      !(
        firstName ||
        lastName ||
        mobile ||
        dob ||
        city ||
        country ||
        zipCode ||
        address
      )
    ) 
    {
      throw new Error("Please provide at least one field to update.");
    }

    // Fetch existing profile by userId
    const existingProfile = await UpdateProfile.findOne({where:{ userId: req.userId }});

    if (!existingProfile) {
      throw new Error("Profile not found.");
    }

    // Update only provided fields
    if (firstName !== undefined) existingProfile.firstName = firstName;
    if (lastName !== undefined) existingProfile.lastName = lastName;
    if (mobile !== undefined) existingProfile.mobile = mobile;
    if (dob !== undefined) existingProfile.dob = dob;
    if (city !== undefined) existingProfile.city = city;
    if (country !== undefined) existingProfile.country = country;
    if (zipCode !== undefined) existingProfile.zipCode = zipCode;
    if (address !== undefined) existingProfile.address = address;

    // Save the updated profile
    await existingProfile.save();

    res.status(200).json({
      message: "Profile updated successfully.",
      profile: existingProfile,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});



router.get("/getupdateprofile", userCtrl.getupdateProfile)


module.exports = router;
