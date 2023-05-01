const express = require("express");
const router = express.Router();
const moment = require('moment');
const Basket  = require("../database/models/basket");
const Booking  = require("../database/models/booking");
const Activity  = require("../database/models/activity");
const Classes  = require("../database/models/classes");
const Facility = require("../database/models/facility");
const Discount  = require("../database/models/discount");
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
            return res.status(404).json({ message: "Customer not found" });
        }

        // check if same booking added to basket
        const sameItem = await Basket.findOne({ where: {startTime: start, customerId, date}})
        if (sameItem) {
            return res.status(401).json({ message: "You have already booked for this time slot" });
        }

        // check if same booking has already been made
        const sameBooking = await Booking.findOne({ where: {startTime: start, customerId, date}})
        if (sameBooking) {
            return res.status(401).json({ message: "You have a booking session" });
        }

        // check facility exists
        const facility = await Facility.findOne({ where: { facilityName: facilityName } });
        if (!facility) {
            return res.status(404).json({ message: "Facility not found" });
        }

        // check if activity or class exists
        let basketType;
        let basketTypeId;
        let end;
        let prices;
        if (activityId) {
            const activity = await Activity.findOne({ where: {activityId, facilityName} });
            if (!activity) 
                return res.status(404).json({ message: "This activity is not available at this facility" });    
            // set endTime for "Team events" to be +2hr after startTime    
            // other activities +1hr
            if (activity.activityName === "Team events") {
                end = moment.duration(start).add(moment.duration('02:00:00'));
            } else {
                end = moment.duration(start).add(moment.duration('01:00:00'));
            }
            if (customer.isMembership == true) {
                prices = "0";
            } else {
                prices = activity.price;
            }
            basketType = "activity";
            basketTypeId = activityId;
        } 
        else if (classId) {
            const classes = await Classes.findOne({ where: {classId, facilityName} });
            if (!classes) 
                return res.status(404).json({ message: "This class is not available at this facility" });
            // set endTime for classes to be +1hr after startTime
            end = moment.duration(start).add(moment.duration('01:00:00'));
            if (customer.isMembership == true) {
                prices = "0";
            } else {
                prices = classes.price;
            }
            basketType = "class";
            basketTypeId = classId;
        } 
        else
            return res.status(400).json({ message: "Basket is empty" }); 

        // format the endTime
        end = moment.utc(end.as('milliseconds')).format("HH:mm:ss");
        // create item in basket
        const newBasket = await Basket.create({
            date,
            startTime: start,
            endTime: end,
            price: prices,
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
            return res.status(404).json({ message: "Customer not found" });
        }
        const basket = await Basket.findAll({ where: { customerId } });
        const basketDates = basket.map((item) => {
            const date = new Date(item.date);
            // set time component to 0
            date.setHours(0, 0, 0, 0); 
            return date;
        });
        
        // Check if customer has at least 3 items in their basket to apply discount
        if (basket.length >= 3) {
            const discountData = await Discount.findOne();
            const discount = discountData ? discountData.discount : 0;
            
            // Check if all the dates in the basket are within a 7-day period
            let isWithin7Days = true;
            for (let i = 0; i < basketDates.length - 1; i++) {
                const timeDiff = Math.abs(basketDates[i + 1] - basketDates[i]);
                const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if (diffDays > 7) {
                    isWithin7Days = false;
                    // break out of the loop if any date is outside the 7-day period
                    break;
                }
            }
            if (isWithin7Days) {
                // Update the price of each item in the basket to the discounted price
                for (let i = 0; i < basket.length; i++) {
                    if (!basket[i].discountApplied) {
                        basket[i].price = basket[i].price * (1 - discount);
                        basket[i].discountApplied = true;
                        await basket[i].save();
                    }
                }
            }
        } 
        // Check if customer buy membership afer adding stuff to basket
        else if (customer.isMembership == true) {
            // Update the price of each item in the basket to be 0
            for (let i = 0; i < basket.length; i++) {
                basket[i].price = 0;
                await basket[i].save();
            }
        }
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
      return res.status(404).json({ message: "Customer not found" });
    }

    // delete the item with the given basketId
    const deleted = await Basket.destroy({ where: { customerId: customerId, basketId: basketId } });
    if (deleted === 0) {
      return res.status(404).json({ message: "Basket item not found" });
    }

    const basket = await Basket.findAll({ where: { customerId } });
    // Check if customer has at least 3 items in their basket
        if (basket.length < 3) {
            const discountData = await Discount.findOne();
            const discount = discountData ? discountData.discount : 0;
            
            // Update the price of each item in the basket to the discounted price
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].discountApplied) {
                    basket[i].price = basket[i].price / (1 - discount);
                    basket[i].discountApplied = false;
                    await basket[i].save();
                }
            }
        }
    return res.status(200).json({ message: "Basket item deleted" });
  } catch (err) {
    next(err)
  }
});


module.exports=router;