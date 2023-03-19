const express = require("express");
const router = express.Router();
const Staff = require("../database/models/staff");
const bcrypt = require("bcrypt");
const jwtGeneratorStaff = require("../utils/jwtGenerator");
const validData = require("../middleware/validData");
const auth = require("../middleware/auth");

//ROUTES//

// routes for creating new staff
router.post("/register", validData, async (req, res) => {
    // destructure req.body (name, number, email, password)
    const { name, number, email, password, isManager } = req.body;

    try {
        // check if customer already exist
        const existingStaff = await Staff.findOne({ where: {staffEmail : email} });
        if (existingStaff) {
            return res.status(401).send("Staff already exits");
        }
        // hashes password using bcrypt and inserts a new record into the customer table
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // add new customer to database
        await Staff.create({ staffName: name, staffNumber: number, staffEmail: email, password: bcryptPassword, isManager: isManager });

        return res.status(200).send("New staff created.");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }    
});

// routes for logging in existing customer
router.post("/login", validData, async (req, res) => {
    // destructure the req.body
    const { email, password } = req.body;

    try {
        // check if staff does not exist
        const staff = await Staff.findOne({ where: {staffEmail : email} });
        if (!staff) {
            return res.status(404).send("Not Authorise");
        }
        // check if the password matches the hashed password stored in database using bcrypt
        const validPassword = await bcrypt.compare(password, staff.password);
        // if password incorrect (does not match)
        if (!validPassword) {
            return res.status(401).send("Email and Password is incorrect");
        }
        // if password match, generates a JWT token for the customer and sends it in JSON format
        const token = jwtGeneratorStaff(staff.staffId, staff.isManager );

        res.cookie("token", token, {
            httpOnly: true
        })
        .status(200)
        // .json({token});
        return res.status(200).send("Login Successful");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

})

//get all staff//

router.get("/staff", async(req, res) => {
    try {
        const allStaff = await pool.query("SELECT * from staff"); //no returning * because SELECT does that
        res.json(allStaff.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one staff//

router.get("/staff/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const staff = await pool.query("SELECT * from staff WHERE staff_id = $1", [id]) //where clause to specify 

        res.json(staff.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

//update a staff//

//dolar signs are variable holders
/*app.put("/staff/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {staff_name} = req.body;
        const {staff_number} = req.body;
        const {staff_email} = req.body;
        const {staff_title} = req.body;
        const updateStaff = await pool.query("UPDATE staff SET staff_name = $1 WHERE staff_id = $2", //$xxx variable holder w params
        [staff_name, id]) */
        
        /*const updateStaff = await pool.query("UPDATE staff SET (staff_name = $1, staff_number = $2, staff_email = $3, staff_title = $4) WHERE staff_id = $5", //$xxx variable holder w params
        [staff_name, staff_number, staff_email, staff_title, staff_id])*/

        /*res.json("Staff details updated");
    } catch (err) {
        console.error(err.message);
    }
})*/


//delete a staff//

router.delete("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteActivity = await pool.query("DELETE FROM activities WHERE activity_id = $1", 
        [id]);

        res.json("Activity deleted from database");
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;
