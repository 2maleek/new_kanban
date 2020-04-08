const {User, Task} = require('../models')
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
    let UserId, name, organization

    User.findOne({
      where: { email }
    })
    .then(isFound => {
      if(isFound) {
        UserId = isFound.id
        name = isFound.name
        organization = isFound.organization
        return compare(password, isFound.password)
      }
      throw { status: 404, message: 'User not registered'}
    })
    .then(result => {
      if(!result){
        throw { status: 400, message: 'Password wrong'}
      }
      let access_token = jwt.sign({
        UserId,
        name,
        email,
        organization,
      }, process.env.SECRET)
      res.status(200).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }

  static addTask(req, res, next) {
    let { UserId } = req.user
    let { title, description, } = req.body

    Task.create({
      title,
      description,
      UserId
    })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      next(err)
    })

  }

  static getTasks(req, res, next) {
    Task.findAll({
      include: [
        { 
          model: User,
          where: { organization: 'hacktiv8' }
        }
      ]
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
  }

  static editTask(req, res, next) {
    let id = req.params.id
    let { title, description } = req.body

    Task.update({
      title,
      description
    },
    {
      where: { id }
    })
    .then(() => {
      res.status(200).json({message: 'Update task success'})
    })
    .catch(err => {
      next(err)
    })
  }

  static deleteTask(req, res, next) {
    let id = req.params.id

    Task.destroy({
      where: { id }
    })
    .then(() => {
      res.status(200).json({message: 'Delete task success'})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller