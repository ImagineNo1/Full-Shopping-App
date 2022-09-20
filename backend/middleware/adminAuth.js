const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const adminAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    const check = await User.findOne({_id : _id})

    if (!check.isAdmin || check.isAdmin == false ){
        return res.status(401).json({error: 'Not an Admin'})
    }

    req.admin = await User.findOne({ _id }).select('_id')
    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = adminAuth