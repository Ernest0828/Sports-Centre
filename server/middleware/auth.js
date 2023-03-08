require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.jwtSecret;

const verifyToken = async(req,res,next) => {
    try {       
        // destructure the token from fetch request
        const token = req.header("token");

        // if not authorize to enter
        if (!token) {
            return res.status(403).send("Not Authorize");
        }
        // check validity of token
        // if the token is valid, the payload data is extracted and set to req.customer
        const verified = jwt.verify(token, SECRET);
        req.customer = verified.customer;
        next();
        
    } catch (err) {
        console.error(err.message);
        return res.status(403).send("Not Authorize");
    }
}
module.exports = verifyToken;