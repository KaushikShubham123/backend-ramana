const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/updateProfileController')


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

// 
router.get("/updateprofile/:id", userCtrl.getupdateProfile)


module.exports = router;
