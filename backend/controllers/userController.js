const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
// json web token 

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn : '3d'})
}
// login controller

const userLogin = async (req,res) => {
    const {email,password} = req.body

    try{
        const user = await User.login(email,password)
        const name = user.name
        const lastname = user.lastname

        const token = createToken(user._id)
        res.status(200).json({name,lastname,email,password,token,user_id :user._id})
    }catch(error){
        res.status(400).json({error : error.message})
    }

}

// signup controller

const userSignup = async (req,res) => {

    const {name,lastname,email,password} = req.body

    try{
        
        const user = await User.signup(name,lastname,email,password)

        const token = createToken(user._id)
        
        res.status(200).json({name,lastname,email,password,token,user_id :user._id})

    }catch(error){
        console.log(error)
        res.status(400).json({error : error.message})
    }
}

// update user

const userUpdate = async(req,res) => {

    const {name,lastname,email,password} = req.body
    const {id} = req.params

    try {
        const user = await User.updateUser(name,lastname,email,password,id)

        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error : error.message})
    }
    
}


module.exports = {
    userLogin,
    userSignup,
    userUpdate
    
}