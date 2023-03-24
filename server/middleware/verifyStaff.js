import dotenv from "dotenv";
dotenv.config();
import verifyToken from './verifyToken.js';

// verify the staff
const verifyStaff = async (req, res, next) => {
    try {
        verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isManager != null) {
            next();
        } else {
            return res.status(403).json( {message: "Not Authorised"} );
        }
    });
    } catch (err) {
        console.error(err.message);
        return res.status(403).json( {message: "Not Authorised"} );
    }
};

export default verifyStaff