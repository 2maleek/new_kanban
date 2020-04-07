const { User } = require('../models')
const decode = require('../helpers/decode')

module.exports = (req, res, next) => {
  let decoded = decode(req.headers.access_token)
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