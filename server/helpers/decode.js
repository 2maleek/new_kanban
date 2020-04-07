const jwt = require('jsonwebtoken')

module.exports = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    return decoded
  } catch (error) {
    next(err)
  }
}