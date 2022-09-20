require('dotenv').config()

const { application } = require('express')
const express = require('express')
const mongoose = require('mongoose')

// importing routes
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
// make express app
const app = express()

// middlewares 

//make req bodies to json format
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/products',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/admin',adminRoutes)
// connecting to DB

mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log('Connected to DB')

        // Listening for requests
        app.listen(process.env.PORT,()=>{
            console.log('listening on port ',process.env.PORT)
        })
    }).catch((err)=>{
        console.log(err)
    })

