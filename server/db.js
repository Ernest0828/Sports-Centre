//where we connect database and server
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "vecochen2912",
    host: "localhost",
    port: 4321,
    database: "sports_management"

})

module.exports = pool;