const express = require('express')

const requireAuth = require('../middleware/requireAuth')
const route = express.Router()

// importing Controllers 

const {
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
} = require('../controllers/productController')

// Getting all products

route.get('/',getProducts)

// Getting products for a single user
route.use(requireAuth)

// filter to now show own projects or show all 

route.get('/showOwn',showOwn)

//show userProducts

route.get('/userproduct',getUserProducts)

// Get a single product 

route.get('/:id',getProduct)
// making product

route.post('/',postProduct)

// updating products

route.patch('/:id',updateProduct)

// deleteing product
route.delete('/:id',deleteProduct)

// add to interest 

route.patch('/interests/:id',addToInterests)

// user Intrests 

route.post('/interests',userIntrests)

// remove product from user interests

route.delete('/interests/:id',reomveInterest)

// add comment to product

route.post('/comment/:id',addComment)

// remove Comment from product

route.delete('/comment/:id',deleteComment)

// all comment for a product

route.post('/comment/',showUserComments)

module.exports = route