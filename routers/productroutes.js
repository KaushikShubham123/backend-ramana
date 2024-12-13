const express = require('express')
var db = require('../models');
const User = db.user;
const router = express.Router();
var userCtrl = require('../controllers/productController')

router.post("/addproduct", async (req, res) => {
  try {
    const { productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, productDesc, productImages, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility } = req.body;

    // if (!req.body) { throw Error("Provide category name"); }
    const userDetails = await User.findOne({ where: { id: req.userId } })

    const vendorId = userDetails.vendorId
    // console.log("test");
    const data = await userCtrl.createNewproduct({ vendorId, userId: req.userId, productTitle, categories, productType, shortDesc, brand, unit, tags, exchangeable, refundable, productDesc, productImages, manufacturerName, manufacturerBrand, stocks, price, discount, status, visibility });

    res.status(200).json(data);

  }

  catch (error) {
    console.log(error);
    res.status(400).send(error.message)

  }
});

router.delete("/addproduct/:id", userCtrl.deleteProduct)


module.exports = router;
