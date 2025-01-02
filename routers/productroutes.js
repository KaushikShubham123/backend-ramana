const express = require('express')

var db = require('../models');
const User = db.user;
const S3 = require('../config/S3/config')
const router = express.Router();
const multer = require('multer');
var userCtrl = require('../controllers/productController')
require('dotenv').config();
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const he = require('he');


const window = new JSDOM('').window;
const DOMPurifyInstance = DOMPurify(window);


const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
router.post("/addproduct", upload.array('productImages', 5), async (req, res) => {
  try {
    const { productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, specifications, productDesc, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility } = req.body;

    const cleanedText = he.decode(DOMPurifyInstance.sanitize(productDesc).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' '));


    const userDetails = await User.findOne({ where: { id: req.userId } })

    const vendorId = userDetails.vendorId
    // console.log("test");




    const data = await userCtrl.createNewproduct({
      vendorId,
      userId: req.userId, 
      productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, specifications: JSON.parse(specifications), productDesc: cleanedText, /* productImages: imageUrlsString, */ manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility
    });


    const productId = data.id

    // Upload images to S3
    const imageUrls = [];
    console.log("files", req.files)
    if (req.files) {
      console.log("files", req.files)
      for (const file of req.files) {
        const fileName = `${vendorId}/${productId}/${Date.now()}_${file.originalname}`;
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

    data.productImages = JSON.stringify(imageUrls);
    await data.save();


    res.status(200).json({
      ...data.toJSON(),
      productImages: imageUrls
    });

  }

  catch (error) {
    console.log(error);
    res.status(400).send(error.message)

  }
});

router.delete("/deleteproduct/:id", userCtrl.deleteProduct)


router.get('/getproducts', userCtrl.getProducts)




module.exports = router;
