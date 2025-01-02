const express = require('express')
const cors = require('cors')
var bodyParser = require('body-parser')
require('./models')
// const nodemailer = require("nodemailer")
var userCtrl = require('./controllers/userController')
// const User = require('./models/user')
const app = express()

const authroute = require('./routers/authroutes')
const passwordReset = require('./routers/passwordresetroutes')
const userprofile = require('./routers/userprofileroutes')
// const vendorprofile = require('./routers/vendorcompanydetailsroutes.js.js')

const attendanceroutes = require('./routers/attendancerotues')
const userform = require('./routers/userformroutes.js')
const updateprofile = require('./routers/updateprofile')
const addsubvendor = require('./routers/subvendorroutes')


const product = require('./routers/productroutes')
const { authenticateToken } = require('./controllers/updateProfileController')
const addcompanydetails = require('./routers/vendorcompanydetailsroutes.js')

const customerQuery = require('./routers/customerqueryroutes.js')
const customerProductQuery = require('./routers/customerproductqueryroutes.js')

app.use(bodyParser.json());
app.use(cors());

app.use(authroute);
app.use(passwordReset);
app.use(customerQuery);

app.use(customerProductQuery)
app.use(attendanceroutes)

app.use(authenticateToken);
app.use(userprofile);
// app.use(vendorprofile);


app.use(userform)
app.use(updateprofile)
app.use(addsubvendor);
app.use(addcompanydetails);

app.use(product);


app.get('/user', userCtrl.getUser)
// app.get('/userProfile', userCtrl.userProfile)
app.delete('/user/:id', userCtrl.deleteUser)
// app.post('/email', emailverification)
// app.patch('/user', userCtrl.patchUser)

app.listen(4000, () => {
  console.log('App will run on: http://localhost:4000')
})