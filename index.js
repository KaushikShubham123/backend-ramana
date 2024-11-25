const express = require('express')
var bodyParser = require('body-parser')
require('./models')
// const nodemailer = require("nodemailer")
var userCtrl = require('./controllers/userController')
// const User = require('./models/user')
const app = express()

const authroute = require('./routers/authroutes')
const passwordReset = require('./routers/passwordresetroutes')
const userprofile = require('./routers/userprofileroutes')
const vendorprofile = require('./routers/vendorroutes')
const product = require('./routers/productroutes')
const attendancerotues = require('./routers/attendancerotues')


app.use(bodyParser.json());
// app.use("/api/v1")

app.use(authroute);
app.use(passwordReset);
app.use(userprofile);
app.use(vendorprofile);
app.use(product);
app.use(attendancerotues)


app.get('/user', userCtrl.getUser)
// app.get('/userProfile', userCtrl.userProfile)
app.delete('/user/:id', userCtrl.deleteUser)
// app.post('/email', emailverification)
// app.patch('/user', userCtrl.patchUser)

app.listen(3000, () => {
  console.log('App will run on: http://localhost:3000')
})