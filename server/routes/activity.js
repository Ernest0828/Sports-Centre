const express = require("express");
const router = express.Router();
const Activity  = require("../database/models/activity");
const Facility  = require("../database/models/facility");
const verifyManager = require("../middleware/verifyManager");

// For manager to amend the activities

// 1. Add new activities
router.post("/activityid", verifyManager, async (req, res, next) => {
    const { name, price, facilityName } = req.body;
    try {
        const facility = await Facility.findByPk(facilityName);
        if (!facility) 
            return res.status(404).send("Facility not found");

        // check if activity already exist
        const existingActivity = await Activity.findOne({ where: {activityName: name, facilityName:facilityName}});
        if (existingActivity) 
            return res.status(401).send("Activity already exists");

        await Activity.create({ activityName: name, price: price, facilityName:facilityName });
        return res.status(200).send("New activity created");
    } catch (err) {
        next(err);
    }
});

// 2. Update an existing activity
router.put("/:id", verifyManager, async (req, res, next) => {
    try {
        const updateActivity = await Activity.findByPk(req.params.id);
        res.send(await updateActivity.update(req.body));
    } catch (err) {
        next(err);
    }
});

// 3. Delete activity
router.delete("/:id", verifyManager, async (req, res, next) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        if(!activity) return res.status(404).send("Activity not found");
        else { 
            await activity.destroy(req.body);
            res.status(200).send("Activity deleted");
        }
    } catch (err) {
        next(err);
    }
});

// 4. Get an activity
router.get("/find/:id", async (req, res, next) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        res.json(activity);
    } catch (err) {
        next(err);
    }
});

// 5. Get all activities
router.get("/", async (req, res, next) => {
    try {
        const activities = await Activity.findAll();
        res.json(activities);
    } catch (err) {
        next(err);
    }
});

module.exports = router;