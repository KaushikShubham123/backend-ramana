const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')
const S3 = require('../config/S3/config')
const multer = require('multer');
require('dotenv').config(); 




const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

router.post("/userprofile",upload.array('newImage', 5) ,async (req, res) => {
  try {
    let {
      retailerName, mobile, userid, outletAddress, latitude, longitude, followUpDate, leadPhase/* , newImage */ } = req.body;
    if (!(userid && mobile)) {
      throw Error("Provide user Id and mobile number")
    }
    // if (!(mobile)) {
    //   throw Error("Empty crediantials are not allowed");
    // }




    const newUserProfile = await userCtrl.userProfile({
      retailerName, mobile, outletAddress, latitude, longitude, followUpDate, leadPhase, /* newImage,  */userid
    });


    const salesmanId = newUserProfile.salesman_id
    // Upload images to S3
    const imageUrls = [];
    if (req.files) {
      for (const file of req.files) {
        const fileName = `${salesmanId}/${Date.now()}_${file.originalname}`;
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        const uploadResult = await S3.upload(params).promise();
        imageUrls.push(uploadResult.Location);
      }
    }
    const imageUrlsString = imageUrls.join(',');

    newUserProfile.newImage=imageUrlsString;

await newUserProfile.save();


    res.status(200).json(newUserProfile);

  }

  catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/leads/:userId', userCtrl.getUserId)
router.get('/leads/leadId/:userId', userCtrl.getUserLeadId)
module.exports = router;