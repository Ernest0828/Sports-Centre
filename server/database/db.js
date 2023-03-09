// const Pool = require("pg").Pool;

// const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "hogwarts6393",
//   port: 5432,
//   database: "gymCorp"
// });

// module.exports = pool;

const Sequelize = require("sequelize");

const db = new Sequelize("gymCorp", "postgres", "hogwarts6393", 
{
  host : "localhost",
  dialect : "postgres",
  port : 5432
});

module.exports = db;