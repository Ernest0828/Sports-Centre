const express = require("express");
const router = express.Router();
const Customer  = require("../database/models/customer");
const bcrypt = require("bcrypt");
const verifyUser = require("../middleware/verifyUser");

// 1. Update customer info
router.put("/:id", async (req, res, next) => {
    try {
        const updateUser = await Customer.findByPk(req.params.id);
        const { customerName, ...rest } = req.body;
        const updatedCustomer = await updateUser.update({
            customerName: customerName.toUpperCase(),
            ...rest
        });
        res.status(200).json(updatedCustomer);
    } catch (err) {
        next(err);
    }
});

// 2. To find a single customer
router.get("/find/:id", async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        res.json(customer);
    } catch (err) {
        next(err);
    }
});

// 3. To get all customers
router.get("/", async (req, res, next) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        next(err);
    }
});

// 4. Change password
router.put("/change-password/:id", async (req, res, next) => {
        try {
        const { password } = req.body;
        let bcyrptPassword;
        if (password) {
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            bcyrptPassword = await bcrypt.hash(password, salt);
        }
        const updateUser = await Customer.findByPk(req.params.id);
        const updatedPassword = await updateUser.update({ ...req.body, password: bcyrptPassword });
        res.status(200).json(updatedPassword);
    } catch (err) {
        next(err);
    }
});

// 5. For customer to delete account
router.delete("/:id", async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if(!customer) return res.status(404).json("Customer not found");
        else { 
            await customer.destroy(req.body);
            res.status(200).json("Account deleted");
        }
    } catch (err) {
        next(err);
    }
});

module.exports=router;