// middleware function that is used to verify the authenticity of a JWT sent in a request header
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.jwtSecret;

module.exports = async(req,res,next) => {
    try {       
        // destructure the token from fetch request
        const jwtToken = req.header("token");

        // if not authorize to enter
        if (!jwtToken) {
            return res.status(403).send("Not Authorize");
        }

        // check validity of token
        // if the token is valid, the payload data is extracted and set to req.customer
        const payload = jwt.verify(jwtToken, SECRET);
        req.customer = payload.customer;
        
    } catch (err) {
        console.error(err.message);
        // return error 403 : "Unauthorized"
        return res.status(403).send("Not Authorize");
    }
}