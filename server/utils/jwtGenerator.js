const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.jwtSecret;
const EXPIRATION = "2h";

// function that generates a JWT for a given customer ID
// returns the generated JWT
function jwtGenerator(id) {
    const payload = { customer: { customerId:id }};
    return jwt.sign(payload, SECRET, {expiresIn: EXPIRATION});
}

function jwtGeneratorStaff(id, manager) {
    const payload = { staff: { staffId:id, isManager:manager }};
    return jwt.sign(payload, SECRET, {expiresIn: EXPIRATION});
}
module.exports = jwtGenerator, jwtGeneratorStaff;