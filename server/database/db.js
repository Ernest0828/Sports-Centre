const Sequelize = require("sequelize");

const db = new Sequelize("gymCorp", "postgres", "hogwarts", 
{
  host : "localhost",
  dialect : "postgres",
  port : 5432,
});

module.exports = db