require('dotenv').config();
const verifyToken = require('./verifyToken');

// verify the customer
const verifyUser = async (req, res, next) => {
    try {
        verifyToken(req, res, () => {
        if (req.user.id === req.params.id) {
            console.log("hello")
        // if (req.user.customer && req.user.customer.customerId === req.params.id) {  
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

module.exports = verifyUser;