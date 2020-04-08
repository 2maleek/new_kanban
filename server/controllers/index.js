const {User, Task} = require('../models')
const decode = require('../helpers/decode')
const { compare } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

class Controller {
  static register(req, res, next) {
    let { name, email, password } = req.body
    User.findOne({
      where: { email} 
    })
    .then(isFound => {
      if(!isFound) {
        return User.create({
          name,
          email,
          password
        })
      }
      throw { status: 409, message: 'Email already registered'}
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {
    let { email, password } = req.body

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        console.log(password, isFound.password)
        return compare(password, isFound.password)
      }
      throw { status: 404, message: 'User not registered'}
    })
    .then(result => {
      console.log(result)
      if(result){
        res.status(200).json({o:'ok'})
      }
      throw { status: 400, message: 'Password wrong'}
    })
    .catch(err => {
      next(err)
    })
  }

  static addTask(req, res, next) {

  }

  static getTasks(req, res, next) {

  }

  static editTask(req, res, next) {

  }

  static deleteTask(req, res, next) {

  }
}

module.exports = Controller