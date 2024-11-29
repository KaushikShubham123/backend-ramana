const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userFormController')


router.post("/userform", async (req, res) => {
  try {
    const { name, mobile, email, message, itemCategory } = req.body;

    if (!(name && mobile && email && itemCategory)) { throw Error('Please provide all required details'); }

    const data = await userCtrl.createNewForm({ name, mobile, email, message, itemCategory });

    res.status(200).json(data);

  }

  catch (error) {
    console.log(error);
    res.status(400).send(error.message)

  }
});

// 
router.get("/userform/:id", userCtrl.getForm)


module.exports = router;
