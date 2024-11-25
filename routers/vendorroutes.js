const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')

router.post("/vendorprofile", async (req, res) => {
  try {
    const mobile = req.body;

    if (!mobile) { throw Error("Provide Mobile number"); }
    // console.log("test");
    const data = await userCtrl.vendorProfile(mobile);

    res.status(200).json(data);

  }

  catch (error) {
    console.log(error);
    res.status(400).send(error.message)

  }
});

router.delete("/vendorprofile/:id", userCtrl.deleteUserProfile)
module.exports = router;

