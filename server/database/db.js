const Sequelize = require("sequelize");

const db = new Sequelize("gymCorp", "postgres", "Pok@2013Chezz", 
{
  host : "localhost",
  dialect : "postgres",
  port : 5432,
});

module.exports = db