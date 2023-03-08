const express = require("express")
const router = express.Router()
const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validData = require("../middleware/validData");
const auth = require("../middleware/auth")

// routes for registering new customer
router.post("/register", validData, async (req, res) => {
    // destructure req.body (name, number, email, password)
    const { name, number, email, password } = req.body;

    try {
        // check if customer already exist
        const customer = await pool.query("SELECT * FROM customer WHERE email = $1", [
            email
        ]);
        if (customer.rows.length > 0) {
            return res.status(401).send("User already exits");
        }
        // hashes password using bcrypt and inserts a new record into the customer table
        // bcrypt customer password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // add new customer to database
        let newCustomer = await pool.query
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

// routes for logging in existing customer
router.post("/login", validData, async (req, res) => {
    // destructure the req.body
    const { email, password } = req.body;

    try {
        // check if customer does not exist
        const customer = await pool.query("SELECT * FROM customer WHERE email = $1", [
            email
        ]);
        if (customer.rows.length === 0) {
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

router.get("/verify", auth, (req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;