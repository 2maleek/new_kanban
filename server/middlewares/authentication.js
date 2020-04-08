const { User } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const decoded = jwt.verify(req.headers.access_token, process.env.SECRET)
  req.user = decoded
  User.findOne({
    where: { email : decoded.email }
  })
  .then(isFound => {
    isFound ? next() : next({status: 404, message: 'User not found'})
  })
  .catch(err => {
    next(err)
  })
}