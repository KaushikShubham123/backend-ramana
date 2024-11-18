const express = require('express')
var bodyParser = require('body-parser')
require('./models')
// const nodemailer = require("nodemailer")
var userCtrl = require('./controllers/userController')
// const User = require('./models/user')
const app = express()

const authroute = require('./routers/authroutes')
const passwordReset = require('./routers/passwordresetroutes')

app.use(bodyParser.json())
// app.use("/api/v1")

app.use(authroute);
app.use(passwordReset);


// app.get('/user', userCtrl.addUser)
// app.post('/user', userCtrl.postUser)
app.delete('/user/:id', userCtrl.deleteUser)
// app.post('/email', emailverification)
// app.patch('/user', userCtrl.patchUser)

app.listen(3000, () => {
  console.log('App will run on: http://localhost:3000')
})