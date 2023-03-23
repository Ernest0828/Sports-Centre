import express from "express";
const router = express.Router();
import Customer from "../database/models/customer.js"
import bcrypt from "bcrypt"
import verifyUser from "../middleware/verifyUser.js";

// 1. Update customer info
router.put("/:id", verifyUser, async (req, res, next) => {
    try {
        const updateUser = await Customer.findByPk(req.params.id);
        const updatedCustomer = await updateUser.update(req.body);
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
router.put("/change-password/:id", verifyUser, async (req, res, next) => {
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
router.delete("/:id", verifyUser, async (req, res, next) => {
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

export default router