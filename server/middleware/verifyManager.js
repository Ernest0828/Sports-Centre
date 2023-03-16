require('dotenv').config();
const verifyToken = require('./verifyToken');

// verify if a staff is type Manager
const verifyManager = async (req, res, next) => {
    try {
        verifyToken(req, res, () => {
        if (req.user.isManager === false) {
            return res.status(403).send("Not Authorised");
        } else {
            next();
        }
    });
    } catch (err) {
        console.error(err.message);
        return res.status(403).send("Not Authorised");
    }
};

module.exports = verifyManager