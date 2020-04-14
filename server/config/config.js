require('dotenv').config()

module.exports = {

  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "osmjvpdtvxwijo",
    "password": "d4ce00bf41f1b1724d63cf95adc2e3524adcc4eebb79adde01219510b1e8c7ba",
    "database": "d4ibuuqa1sfjp0",
    "host": "ec2-52-71-85-210.compute-1.amazonaws.com",
    "dialect": "postgres",
  }
}
