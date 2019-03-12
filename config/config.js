"use strict";
require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DIALECT,
    "port": process.env.MYSQL_PORT,
    "logging": true
  },
  "test": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DIALECT,
    "port": process.env.MYSQL_PORT,
    "logging": false
  },
  "production": {
    "username": process.env.MYSQL_USERNAME,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DIALECT,
    "port": process.env.MYSQL_PORT,
    "logging": false
  }
}
