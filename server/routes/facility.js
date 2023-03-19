const express = require("express");
const router = express.Router();
const Facility  = require("../database/models/facility");
const verifyManager = require("../middleware/verifyManager");

// 1. Add new facilities (only for manager)
router.post("/facilityid", verifyManager, async (req, res, next) => {
    const { name, capacity, start, end } = req.body;
    try {
        // check if activity already exist
        const existingFacility = await Facility.findOne({ where: {facilityName: name}});
        if (existingFacility) 
            return res.status(401).send("Facility already exists");

        await Facility.create({ facilityName: name, capacity: capacity, startTime: start, endTime: end });
        return res.status(201).send("New facility created");
    } catch (err) {
        next(err);
    }
});

// 2. Update an existing facility (only for manager)
router.put("/:id", verifyManager, async (req, res, next) => {
    try {
        const updateFacility = await Facility.findByPk(req.params.id);
        await updateFacility.update(req.body);
        return res.status(200).send("Facility updated");
    } catch (err) {
        next(err);
    }
});

// 3. Delete facility (only for manager)
router.delete("/:id", verifyManager, async (req, res, next) => {
    try {
        const facility = await Facility.findByPk(req.params.id);
        if(!facility) return res.status(404).send("Facility not found");
        else { 
            await facility.destroy(req.body);
            res.status(200).send("Facility deleted");
        }
    } catch (err) {
        next(err);
    }
});

// 4. Get an facility
router.get("/:id", async (req, res, next) => {
    try {
        const facility = await Facility.findByPk(req.params.id);
        res.json(facility);
    } catch (err) {
        next(err);
    }
});

// 5. Get all facilities
router.get("/", async (req, res, next) => {
    try {
        const facilities = await Facility.findAll();
        res.json(facilities);
    } catch (err) {
        next(err);
    }
});

module.exports = router;