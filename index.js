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

app.use(bodyParser.json())
// app.use("/api/v1")

app.use(authroute);
app.use(passwordReset);
app.use(userprofile)


app.get('/user', userCtrl.addUser)
app.get('/userProfile', userCtrl.userProfile)
app.delete('/user/:id', userCtrl.deleteUser)
// app.post('/email', emailverification)
// app.patch('/user', userCtrl.patchUser)

app.listen(3000, () => {
  console.log('App will run on: http://localhost:3000')
})