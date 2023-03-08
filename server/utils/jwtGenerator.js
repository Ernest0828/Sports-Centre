const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.jwtSecret;
const EXPIRATION = "2h";

// function that generates a JWT for a given customer ID
// returns the generated JWT
function jwtGenerator(custId) {
    const payload = { customer: { id:custId }};
    return jwt.sign(payload, SECRET, {expiresIn: EXPIRATION});
}

module.exports = jwtGenerator;