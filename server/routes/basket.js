const express = require("express");
const router = express.Router();
const moment = require('moment');
const Basket  = require("../database/models/basket");
const Booking  = require("../database/models/booking");
const Activity  = require("../database/models/activity");
const Classes  = require("../database/models/classes");
const Facility = require("../database/models/facility");
const Payment  = require("../database/models/payment");
const Customer  = require("../database/models/customer");
const verifyUser = require("../middleware/verifyUser");

// 1. Send item to basket
router.post("/basketid", async (req, res, next) => {
    try {
        const {
            date,
            start,
            customerId,
            activityId,
            classId,
            facilityName } = req.body;

        // check if customer exists
        const customer = await Customer.findByPk(customerId);
        if (!customer){
            return res.status(404).json("Customer not found");
        }

        // check if same booking added to basket
        const sameItem = await Basket.findOne({ where: {startTime: start, customerId, date}})
        if (sameItem) {
            return res.status(401).json("You have already booked for this time slot");  
        }

        // check if same booking has already been made
        const sameBooking = await Booking.findOne({ where: {startTime: start, customerId, date}})
        if (sameBooking) {
            return res.status(401).json("You have a booking session");
        }
        
        // check if activity or class exists
        let basketType;
        let basketTypeId;
        let end;
        if (activityId) {
            const activity = await Activity.findOne({ where: {activityId, facilityName} });
            if (!activity) 
                return res.status(404).json("This activity is not available at this facility");    
            // set endTime for "Team events" to be +2hr after startTime    
            // other activities +1hr
            if (activity.activityName === "Team events") {
                end = moment.duration(start).add(moment.duration('02:00:00'));
            } else {
                end = moment.duration(start).add(moment.duration('01:00:00'));
            }
            price = activity.price;
            basketType = "activity";
            basketTypeId = activityId;
        } 
        else if (classId) {
            const classes = await Classes.findOne({ where: {classId, facilityName} });
            if (!classes) 
                return res.status(404).json("This class is not available at this facility");
            // set endTime for classes to be +1hr after startTime
            end = moment.duration(start).add(moment.duration('01:00:00'));
            price = classes.price;
            basketType = "class";
            basketTypeId = classId;
        } 
        else
            return res.status(400).json("Basket is empty"); 
            
        // format the endTime
        end = moment.utc(end.as('milliseconds')).format("HH:mm:ss");
        
        // create item in basket
        const newBasket = await Basket.create({
            date,
            startTime: start,
            endTime: end,
            price,
            basketType,
            customerId,
            ['${basketType}Id']: basketTypeId,
            classId,
            activityId,
            facilityName
        });
        return res.status(200).json(newBasket);
    } catch (err) {
        next(err);
    }
});

// 2. Get items in basket for a customer
router.get("/basket/:customerId", async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json("Customer not found");
        }
        
        const basket = await Basket.findAll( {where: {customerId } });
        return res.status(200).json(basket);
    } catch (err) {
        next(err);
    }
});

// 3. Delete an item in basket
router.delete("/:customerId/:basketId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const basketId = req.params.basketId;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json("Customer not found");
    }

    // delete the item with the given basketId
    const deleted = await Basket.destroy({ where: { customerId: customerId, basketId: basketId } });
    if (deleted === 0) {
      return res.status(404).json("Basket item not found");
    }

    return res.status(200).json("Basket item deleted");
  } catch (err) {
    next(err)
  }
});


module.exports=router;