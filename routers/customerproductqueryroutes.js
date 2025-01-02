const express = require('express')
const router = express.Router();
var userCtrl = require('../controllers/userController')
var userControl = require('../controllers/customersProductQueryController')
const generatePassword = require('../utiity/generatepassword');
const sendEmail = require('../utiity/sendemail');
const db = require('../models');
const User = db.user

router.post("/createquery", async (req, res) => {
    try {
        const { productId,name, mobile, email, city, country,
           purchaseType,   } = req.body;


        const customerExists = await User.findOne({ where: { email } })

        if (!customerExists) {


            const password = await generatePassword();

            //good credentials, create new user 
            const createdUser = await userCtrl.createNewUser({
                email, userType: "Customer", mobile, password
            });


            createdUser.verified = true

            createdUser.save();

            // const Email = 'Email';
            const message = 'Here is your password for login in Ramana Machines, reset it once you login';

            const mailOptions = {
                from: process.env.APP_EMAIL,
                to: email,
                subject: "Ramana Machines",
                html: `<p>${message}</p>
         <p style= "color:tomato;font-size:25px,letter-spacing:2px;">
         <b>Password:${password}</b>
         </p>`

            }
            await sendEmail(mailOptions);
          
            // res.status(200).json({
            //     isSucces: true,
            //     data: createdUser
          
            //   })


        };

        const data = await userControl.customerproductquery({productId,name,mobile, email, city, country, purchaseType });

        res.status(200).json(data);

    }

    catch (error) {
        // console.log(error.message);
        res.status(400).send(error.message)

    }
});




module.exports = router;
