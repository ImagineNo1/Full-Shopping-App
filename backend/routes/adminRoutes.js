const express = require('express')

const route = express.Router()

const adminAuth = require('../middleware/adminAuth')

const {
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
} = require ('../controllers/admincontroller')
// verification for being an Admin

route.use(adminAuth)

// Verify its an admin

route.post('/verify',verifyAdmin)

// all users for admin

route.get('/users',getUsers)

// all products for admin

route.get('/products',getProducts)

// delete a user by admin

route.delete('/deluser/:id',deleteUser)

//delete a product by admin

route.delete('/delproduct/:id',deleteProduct)

// promote to admin

route.post('/promote/:id',Promote)

//demote in Admins Page

route.post('/demoteAdmins/:id',DemoteinAdminsPage)

// demote to user

route.post('/demote/:id',Demote)

// get all roles by admin

route.get('/admins',roles)

// get pending posts

route.get('/pending',PendingPosts)

// publishing post by admin

route.post('/publish/:id',Publish)


// publish from pending page

route.post('/publishPending/:id',PublishFromPendingsPage)

//pending post by admin

route.post('/pending/:id',Pending)


module.exports = route
