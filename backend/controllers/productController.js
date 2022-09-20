const { default: mongoose } = require('mongoose')
const Product = require('../models/productModel')

// Getting all products Controller 

const getProducts = async (req,res) => {

    const products = await Product.find({status : "published"}).sort({createdAt : -1})

    res.status(200).json(products)
}

// filter to now show own projects or show all 

const showOwn = async(req,res) => {

    const user_id = req.user._id


    if (!mongoose.Types.ObjectId.isValid(user_id)){       
        return res.status(404).json({error  :"not a valid user"})
    }

    const products = await Product.find({status : "published" , user_id : {$ne : user_id }}).sort({createdAt : -1})

    if (!products){
        return res.status(404).json({error : "No such a project"})
    }

    res.status(200).json(products)

}

// Getting products for a single user Controller

const getUserProducts = async (req,res) => {
    const user_id = req.user._id
    const products = await Product.find({user_id : user_id}).sort({createdAt : -1})
    if (!products){
        res.status(400).json({error : "No such a Products"})
    }
    res.status(200).json(products)
}

// Get a single product Controller

const getProduct = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Product'})
    }

    const workout = await Product.findById(id)
    if (!workout) {
        return res.status(400).json({error: 'No such Product'})
      }
    res.status(200).json(workout)
}

// create workout controller 

const postProduct = async(req,res) => {
    const {title,about,price,category,number,instagram,telegram} = req.body

    let emptyFields = []
    if(!title){
        emptyFields.push('title')
    }
    if(!about){
        emptyFields.push('about')
    }
    if(!price){
        emptyFields.push('price')
    }
    if(!category){
        emptyFields.push('category')
    }
    if(!number){
        emptyFields.push('number')
    }
    if(!instagram){
        emptyFields.push('instagram')
    }
    if(!telegram){
        emptyFields.push('telegram')
    }

    if (emptyFields.length > 0 ){
        return res.status(400).json({error : 'Please fill in all The fields',emptyFields})
    }
    
    try {
        const user_id = req.user._id
        const product = await Product.create({title,about,price,category,number,instagram,telegram,user_id,interests : [],status : "pending"})
        res.status(200).json(product)
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// updating products Controller

const updateProduct = async(req,res) => {
    const {id} = req.params

    const {title,about,price,category,number,instagram,telegram} = req.body

    try{
        const product = await Product.updateProduct(title,about,price,category,number,instagram,telegram,id)

        res.status(200).json(product)
    }catch(error){
        res.status(400).json({error : error.message})
    }
    
    
}

const deleteProduct = async(req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such product'})
    }

    const product = await Product.findByIdAndDelete(id)

    if(!product){
        return res.status(400).json({error: 'No such product'})
    }

    res.status(200).json(product)
}

const addToInterests = async (req,res) => {
    const {id} = req.params
        
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such product'})
    }
    const user_id = req.user._id



    const exists = await Product.find({_id : id , interests : user_id});

    if (exists.length > 0){
        return res.status(404).json({error : "you already added this product to your interests"})
     }
    
    await Product.findOneAndUpdate({_id : id},{ $push : {
        interests : user_id
    }})

    const result = await Product.findById(id)

    res.status(200).json(result)

}

const userIntrests = async (req,res) => {
    
    const user_id = req.user._id
    
    
    const products = await Product.find({interests :  user_id });

    if (!products){
        res.status(404).json({error : "No such Products"})
    }

    res.status(200).json(products)

}

const reomveInterest = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such product'})
    }
    const user_id = req.user._id

    const exists = await Product.find({_id : id , interests : user_id});

    if (exists.length < 1){
        return res.status(404).json({error : "you havent add this product to your interests yet !"})
     }

     await Product.findOneAndUpdate({_id : id},{ $pull : {
        interests : user_id
    }})

    const result = await Product.findById(id)

    res.status(200).json(result)
}


// Add Comment

const addComment = async(req,res) => {
    const {id} = req.params
    const {comment} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not a valid Product"})
    }
    const user_id = req.user._id
    const exists = await Product.find({_id : id , "comments.user" : user_id})

    if (exists.length > 0 ){
        return res.status(400).json({error :"Already Added a Comment"})
    }
    const product = await Product.findOneAndUpdate({_id : id},{ $push : {
        comments : {
            user : user_id,
            comment : comment
        }
    }})
    if (!product){
        return res.status(404).json({error: "Not a valid Product"})
    }
    const result = await Product.findById(id)
    res.status(200).json(result)
}

// delete Comment

const deleteComment = async(req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Not a valid Product"})
    }
    const user_id = req.user._id
    const exists = await Product.find({_id : id , "comments.user" : user_id})

    if (exists.length < 1 ){
        return res.status(400).json({error :"You have no Comment on this product yet"})
    }
    const product = await Product.findOneAndUpdate({_id : id},{ $pull : {
        comments : {
            user : user_id,
        }
    }})
    if (!product){
        return res.status(404).json({error: "Not a valid Product"})
    }
    
    const result = await Product.findById(id)
    res.status(200).json(result)
}

// show Comments for a product

const showUserComments = async(req,res) => {
    
    const user_id = req.user._id

    const products = await Product.find({"comments.user" : user_id})

    if (!products){
        return res.status(404).json({error: "Theres no comment for this user"})
    }

    res.status(200).json(products)
}



module.exports = {
    getProducts,
    showOwn,
    getProduct,
    getUserProducts,
    postProduct,
    updateProduct,
    deleteProduct,
    addToInterests,
    userIntrests,
    reomveInterest,
    addComment,
    deleteComment,
    showUserComments
}