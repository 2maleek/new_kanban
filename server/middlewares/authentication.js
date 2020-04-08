const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  // Untuk menangkap error dari jwt, jika error dari jwt berarti token tidak valid
  // mencegah inject sembarang access_token
  try {
    const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
    req.user = decoded
  } catch (error) {
    throw {status: 401, message: 'Not authenticated'}
  }
  User.findOne({
    where: { email : req.user.email }
  })
  .then(isFound => {
    if(!isFound){
      throw {status: 404, message: 'User not found'}
    }
    next()
  })
  .catch(err => {
    next(err)
  })
}