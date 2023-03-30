const Sequelize = require("sequelize");

const db = new Sequelize("gymCorp", "postgres", "23072003", 
{
  host : "localhost",
  dialect : "postgres",
  port : 5432,
});

module.exports = db;