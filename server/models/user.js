'use strict';
module.exports = (sequelize, DataTypes) => {
  const { hash } = require('../helpers/bcrypt')

  const { Model } = sequelize.Sequelize
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    organization: {
      type: DataTypes.STRING
    }
  }, 
  { 
    hooks: {
      beforeSave(user, options) {
        return hash(user.password)
        .then(result => {
          user.password = result
          user.organization = 'hacktiv8'
        })
      }
    },
    sequelize 
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};