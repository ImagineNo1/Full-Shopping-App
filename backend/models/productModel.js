const mongoose = require('mongoose')

const schema = mongoose.Schema

const productSchema = new schema({
    title : {
        type : String,
        required : true
    },
    about:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    category:{
        type : String,
        required : true
    },
    number :{
        type : Number,
        required : true
    },
    instagram:{
        type : String,
        required :true
    },
    telegram:{
        type:String,
        required: false
    },
    user_id : {
        type : String,
        required : true
      },
      interests : {
        type : Array,
        required : false
    },
    comments: {
        type : Array,
        required : false
    },
    status : {
        type : String,
        required : true
    }
},{timestamps : true})

productSchema.statics.updateProduct = async function (title,about,price,category,number,instagram,telegram,id){

    if (!mongoose.Types.ObjectId.isValid(id)){
        throw Error('No such a product')
    }
    const exists = await this.findById(id)
    if (!title) {
        title = exists.title
    }
    if (!about) {
        about = exists.about
    }
    if (!price) {
        price = exists.price
    }
    if (!category) {
        category = exists.category
    }
    if (!number) {
        number = exists.number
    }
    if (!instagram) {
        instagram = exists.instagram
    }
    if (!telegram) {
        telegram = exists.telegram
    }
    if (exists.title === title && exists.about === about && exists.price === price && exists.category === category && exists.number === number && exists.instagram === instagram && exists.telegram === telegram ){
        throw Error('You cant Enter the same values as before !')
    }
    const product = await this.findOneAndUpdate({_id : id},{
        title,about,price,category,number,instagram,telegram
    })

    if (!product) {
        throw Error('No such product')
      }

    return product
}
module.exports = mongoose.model('Product',productSchema)