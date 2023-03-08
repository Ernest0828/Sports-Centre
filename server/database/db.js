const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "hogwarts6393",
  port: 5432,
  database: "gymCorp"
});

module.exports = pool;
