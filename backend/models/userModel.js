const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const schema = mongoose.Schema

const userSchema = new schema({
    name : {
        type : String,
        required : false
    },
    lastname : {
        type : String,
        required : false
    },
    email : {
        type : String ,
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    isAdmin : {
        type : Boolean,
        required : false
    },
    isOwner : {
        type : Boolean,
        required : false
    }
},{timestamps : true})


userSchema.statics.signup = async function(name,lastname,email,password){
    if (!name || !lastname || !email || !password){
        throw Error('Please fill all fields')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exists  = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = this.create({name,lastname,email,password : hash})

    return user
}

userSchema.statics.login = async function(email,password){

    if (!email || !password){
        throw Error('All Fields must be field')
    }
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password,user.password)

    if (!match){
        throw Error('Incorrect password')
    }

    return user
}
userSchema.statics.updateUser = async function (name,lastname,email,password,id) {
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        throw Error('Not a Valid User')
    }
    const exists = await this.findById(id)

    if (!name) {
        name = exists.name
    }
    if (!lastname) {
        lastname = exists.lastname
    }
    if (!email) {
        email = exists.email
    }

    const match = await bcrypt.compare(password,exists.password)

    if (exists.name === name && exists.lastname === lastname && exists.email === email && match){
        throw Error('You cant Enter the same values as before !')
    }

    if (!validator.isEmail(email)){
        throw Error('Not a valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    
    const user = await this.findOneAndUpdate({_id : id},{ 
        name,lastname,email,password : hash
    })
    if (!user){
        throw Error('Not a valid User')
    }

    return user
}

module.exports = mongoose.model('User',userSchema)