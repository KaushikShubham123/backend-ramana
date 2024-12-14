const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/customerQueryController')


router.post("/addquery", async (req, res) => {
  try {
    let {
      name, email, phone, message, productName } = req.body;
    if (!(name && email && phone && message && productName)) {
      throw Error("Provide all details")
    }
    // if (!(mobile)) {
    //   throw Error("Empty crediantials are not allowed");
    // }
    const newQuery = await userCtrl.addCustomerQury({
      name, email, phone, message, productName
    });
    res.status(200).json(newQuery);

  }

  catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;