require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.jwtSecret;

const verifyToken = async (req, res, next) => {
    try {       
        // destructure the token from fetch request
        // const token = req.header("token");
        const token = req.cookies.token;
        // if not authorize to enter
        if (!token) {
            return res.status(403).send("Not Authenticated");
        }
        // check validity of token
        // if the token is valid, the payload data is extracted and set to req.customer
        // const verified = jwt.verify(token, SECRET);
        // req.customer = verified.customer;
        // next();
        jwt.verify(token, SECRET, (err, user) => {
            if (err) return res.status(403).send("Token not valid");
            req.user = user;
            next();
        });      
    } catch (err) {
        console.error(err.message);
        return res.status(403).send("Not Authenticated");
    }
};

// verify the customer
const verifyUser = async (req, res, next) => {
    try {
        verifyToken(req, res, next, () => {
        if (req.customer.customerId === req.params.id || req.staff.staffId === req.params.id || req.staff.isManager) {
            next();
        } else {
            return res.status(403).send("Not Authorised");
        }
    });
    } catch (err) {
        console.error(err.message);
        return res.status(403).send("Not Authorised");
    }
};

// verify is staff is type Manager
const verifyManager = async (req, res, next) => {
    try {
        verifyToken(req, res, next, () => {
        if (req.staff.isManager) {
            next();
        } else {
            return res.status(403).send("Not Authorised");
        }
    });
    } catch (err) {
        console.error(err.message);
        return res.status(403).send("Not Authorised");
    }
};

module.exports = verifyToken, verifyUser, verifyManager;