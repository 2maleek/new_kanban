const { Task } = require('../models')
const decode = require('../helpers/decode')

module.exports = (req, res, next) => {
  let userData = decode(req.headers.access_token)
  let id = req.params.id

  Task.findOne({
    where: { id }
  })
  .then(isFound => {
    if(!isFound) {
      next({status: 404, message: 'Task not found'})
    }
    if(userData.id !== isFound.id) {
      next({status: 403, message: 'Forbidden access'})
    }
    next()
  })
  .catch(err => {
    next(err)
  })
}