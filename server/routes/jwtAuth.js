// import all necessary dependencies
const express = require("express")
const router = express.Router()
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validity = require("../middleware/validData");

// routes for registering new customer, using HTTP POST method
router.post("/register", validity, async (req, res) => {
    try {
        // destructure req.body (name, number, email, password)
        const { name, number, email, password } = req.body;

        // check if customer already exist
        const customer = await pool.query("SELECT * FROM customer WHERE email = $1", [
            email
        ]);
        if (customer.rows.length != 0) {
            // return error 401 : "Unauthenticated"
            return res.status(401).send("User already exits");
        }
        // hashes password using bcrypt and inserts a new record into the customer table
        // bcrypt customer password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // add new customer to database
        const newCustomer = await pool.query
        ("INSERT INTO customer (custName, custNumber, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, number, email, bcryptPassword]
        );

        // if insert success, generates a JWT token for new customer and sends it in JSON format
        const token = jwtGenerator(newCustomer.rows[0].custId);
        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// routes for logging in existing customer, using HTTP POST method
router.post("/login", validity, async (req, res) => {
    try {
        // destructure the req.body
        const { email, password } = req.body;

        // check if customer does not exist
        const customer = await pool.query("SELECT * FROM customer WHERE email = $1", [
            email
        ]);
        if (customer.rows.length === 0) {
            // error 401 : "Unauthenticated"
            return res.status(401).send("Email and Password is incorrect");
        }

        // check if the password matches the hashed password stored in database using bcrypt
        const validPassword = await bcrypt.compare(password, customer.rows[0].password);

        // if password incorrect (does not match)
        if (!validPassword) {
            return res.status(401).send("Email and Password is incorrect");
        }

        // if password match, generates a JWT token for the customer and sends it in JSON format
        const token = jwtGenerator(customer.rows[0].custId);
        return res.json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;