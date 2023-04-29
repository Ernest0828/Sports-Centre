const express = require("express");
const router = express.Router();
const Discount  = require("../database/models/discount");

router.post('/', async (req, res, next) => {
    try {
        const { discount } = req.body;

        // Create a new Discount record for the customer
        const newDiscount = await Discount.create({discount});
        
        return res.status(201).json(newDiscount);

    } catch (err) {
        next(err);
    }
});

module.exports = router;