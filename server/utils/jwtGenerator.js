// to generate JWT for customers during the login and registration processes in the REST API
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.jwtSecret;
const EXPIRATION = '1h';

// function that generates a JWT for a given customer ID
// returns the generated JWT
function jwtGenerator(custId) {
    const payload = { customer: custId }
    return jwt.sign(payload, SECRET, {expiresIn: EXPIRATION});
}

module.exports = jwtGenerator;