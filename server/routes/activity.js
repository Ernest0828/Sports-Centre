import express from "express";
const router = express.Router();
import Activity from "../database/models/activity.js";
import Facility from "../database/models/facility.js";
import verifyManager from "../middleware/verifyManager.js";

// 1. Add new activities (only for manager)
router.post("/activityid", async (req, res, next) => {
    const { name, price, facilityName } = req.body;
    try {
        const facility = await Facility.findByPk(facilityName);
        if (!facility) 
            return res.status(404).send("Facility not found");

        // check if activity already exist
        const existingActivity = await Activity.findOne({ where: {activityName: name, facilityName:facilityName}});
        if (existingActivity) 
            return res.status(401).send("Activity already exists");

        const newActivity = await Activity.create({ activityName: name, price: price, facilityName:facilityName });
        return res.status(200).json(newActivity);
    } catch (err) {
        next(err);
    }
});

// 2. Update an existing activity (only for manager)
router.put("/:id", verifyManager, async (req, res, next) => {
    try {
        const updateActivity = await Activity.findByPk(req.params.id);
        const updatedActivity = await updateActivity.update(req.body);
        return res.status(200).json(updatedActivity);
    } catch (err) {
        next(err);
    }
});

// 3. Delete activity (only for manager)
router.delete("/:id", async (req, res, next) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        if(!activity) return res.status(404).send("Activity not found");
        else { 
            await activity.destroy(req.body);
            res.status(200).json("Activity deleted");
        }
    } catch (err) {
        next(err);
    }
});

// 4. Get an activity
router.get("/find/:id", async (req, res, next) => {
    try {
        const activity = await Activity.findByPk(req.params.id);
        res.status(200).json(activity);
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

export default router