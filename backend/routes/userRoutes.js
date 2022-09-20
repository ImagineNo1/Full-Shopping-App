const express = require('express')

const route = express.Router()

const {
    userLogin,
    userSignup,
    userUpdate
   
} = require('../controllers/userController')

// login route

route.post('/login',userLogin)

// signup route

route.post('/signup',userSignup)

//user update 

route.patch('/update/:id',userUpdate)



module.exports = route