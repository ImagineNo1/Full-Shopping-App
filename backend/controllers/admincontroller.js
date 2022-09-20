const mongoose = require('mongoose')
const Product = require('../models/productModel')
const User = require('../models/userModel')


// Verify its an admin

const verifyAdmin = async(req,res) => {
    res.status(200).json({message : "you are Admin"})
}

// all users for admin

const getUsers = async (req,res) => {

    const users = await User.find().sort({createdAt : -1})

    if (!users){
        return res.status(404).json({error : "No users have been found"})
    }

    res.status(200).json(users)
}

// all products for admin

const getProducts = async (req,res) => {
    
    const products = await Product.find().sort({createdAt : -1})

    if (!products){
        return res.status(404).json({error : "No users have been found"})
    }

    res.status(200).json(products)
}

// delete a user by admin

const deleteUser = async (req,res) => {
    
    const {id} = req.params
    
    const check = await User.findOne({_id : id})

    if (check.isOwner == true){
        return res.status(404).json({error : "you cant remove Owner"})
    }
    const user_id = req.admin._id

    const requester = await User.findOne({_id : user_id})

    if (requester.isAdmin == true && !requester.isOwner && check.isAdmin == true){
        return res.status(404).json({error : "Admins cant remove admins !!!"})
    }

    const exists = await User.findByIdAndDelete(id)

    if (!exists){
        return res.status(404).json({error : "No such a user"})
    }

    res.status(200).json(exists)
}

//delete a product by admin

const deleteProduct = async (req,res) => {
    
    const {id} = req.params

    const exists = await Product.findByIdAndDelete(id)

    if (!exists){
        return res.status(404).json({error : "No such a user"})
    }

    res.status(200).json(exists)
}

// promote to admin

const Promote = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Not a valid user"})
    }

    const user_id = req.admin._id

    const checkOwner = await User.findOne({_id : user_id})

    if (!checkOwner.isOwner){
        return res.status(404).json({error : "Only owner can Promote a user !"})
    }

    const check = await User.findOne({_id : id})

    if (check.isOwner == true){
        return res.status(404).json({error : "owner doesnt need to be promoted :)"})
    }

    if (check.isAdmin){
        return res.status(404).json({error : "This guy is already an Admin !!!"})
    }
    const promote = await User.findOneAndUpdate({_id : id},{$set : {
        isAdmin : true
    }     
    })

    if (!promote){
        return res.status(404).json({error : "Not a valid user"})
    }

    const users = await User.find().sort({createdAt : -1})

    res.status(200).json(users)
}
// demote in Admins page

const DemoteinAdminsPage = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Not a valid user"})
    }

    const user_id = req.admin._id

    const checkOwner = await User.findOne({_id : user_id})

    if (!checkOwner.isOwner){
        return res.status(404).json({error : "Only owner can Demote a user !"})
    }

    const check = await User.findOne({_id : id})

    if (check.isOwner == true){
        return res.status(404).json({error : "You cant demote the owner !!!"})
    }

    if (!check.isAdmin){
        return res.status(404).json({error : "The user is not an admin to get demoted"})
    }
    const demote = await User.findOneAndUpdate({_id : id},{$unset : {
        isAdmin : 1
    }     
    })

    if (!demote){
        res.status(404).json({error : "Not a valid user"})
    }

    res.status(200).json(demote)
}

// demote to user

const Demote = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Not a valid user"})
    }

    const user_id = req.admin._id

    const checkOwner = await User.findOne({_id : user_id})

    if (!checkOwner.isOwner){
        return res.status(404).json({error : "Only owner can Demote a user !"})
    }

    const check = await User.findOne({_id : id})

    if (check.isOwner == true){
        return res.status(404).json({error : "You cant demote the owner !!!"})
    }

    if (!check.isAdmin){
        return res.status(404).json({error : "The user is not an admin to get demoted"})
    }
    const demote = await User.findOneAndUpdate({_id : id},{$unset : {
        isAdmin : 1
    }     
    })

    if (!demote){
        res.status(404).json({error : "Not a valid user"})
    }

    const users = await User.find().sort({createdAt : -1})

    res.status(200).json(users)
}

// get all roles by admin

const roles = async (req,res) => {
    
    const admins = await User.find({isAdmin : {$exists : true}})

    if (!admins){
        return res.status(404).json({error : "No admins detected by server"})
    }

    res.status(200).json(admins)
}

// get pending posts

const PendingPosts = async (req,res) => {

    const products = await Product.find({status : "pending"}).sort({createdAt : -1})

    if (!products){
        return res.status(404).json({error : "No users have been found"})
    }

    res.status(200).json(products)
}

// publishing post by admin

const Publish = async (req,res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Not a valid product"})
    }

    const check = await Product.findOne({_id : id})

    if (check.status === "published"){
        return res.status(404).json({error : "Project is already Published"})
    }

    const product = await Product.findOneAndUpdate({_id : id},{$set : {
        status : "published"
    }})

    if (!product){
        return res.status(404).json({error : "Not a valid product"})
    }
    const result = await Product.find().sort({createdAt : -1})
    res.status(200).json(result)
}

const PublishFromPendingsPage = async (req,res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Not a valid product"})
    }

    const check = await Product.findOne({_id : id})

    if (check.status === "published"){
        return res.status(404).json({error : "Project is already Published"})
    }

    const product = await Product.findOneAndUpdate({_id : id},{$set : {
        status : "published"
    }})

    if (!product){
        return res.status(404).json({error : "Not a valid product"})
    }

    res.status(200).json(product)
}
// pending post by admin

const Pending = async (req,res) => {

    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : "Not a valid product"})
    }

    const check = await Product.findOne({_id : id})

    if (check.status === "pending"){
        return res.status(404).json({error : "Project is already pending"})
    }

    const product = await Product.findOneAndUpdate({_id : id},{$set : {
        status : "pending"
    }})

    if (!product){
        return res.status(404).json({error : "Not a valid product"})
    }

    const result = await Product.find().sort({createdAt : -1})
    res.status(200).json(result)
}


module.exports = {
    verifyAdmin,
    getUsers,
    getProducts,
    deleteUser,
    deleteProduct,
    Promote,
    DemoteinAdminsPage,
    Demote,
    roles,
    PendingPosts,
    Publish,
    PublishFromPendingsPage,
    Pending
}