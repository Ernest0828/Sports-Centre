const router = require("express").Router();
const auth = require("../middleware/auth");
const pool = require("../database/db");

router.get("/", auth, async (req, res) => {
  try {
    const customer = await pool.query(
      "SELECT email FROM customer WHERE custId = $1",
      [req.customer.custId] 
    ); 
    res.json(customer.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;