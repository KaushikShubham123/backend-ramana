const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/productController')

router.post("/productcategory", async (req, res) => {
  try {
    const nameOfcategory = req.body;

    if (!nameOfcategory) { throw Error("Provide category name"); }
    // console.log("test");
    const data = await userCtrl.createNewCategory(nameOfcategory);

    res.status(200).json(data);

  }

  catch (error) {
    console.log(error);
    res.status(400).send(error.message)

  }
});

router.delete("/productCategory/:id", userCtrl.deleteProductCategory)


module.exports = router;
