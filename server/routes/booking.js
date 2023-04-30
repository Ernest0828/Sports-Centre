const express = require("express");
const router = express.Router();
const moment = require('moment');
const Booking  = require("../database/models/booking");
const Activity  = require("../database/models/activity");
const Classes  = require("../database/models/classes");
const Facility = require("../database/models/facility");
const Basket  = require("../database/models/basket");
const Customer  = require("../database/models/customer");
const Staff  = require("../database/models/staff");
const StaffBooking  = require("../database/models/staffBooking");
const verifyUser = require("../middleware/verifyUser");
const verifyStaff = require("../middleware/verifyStaff");
const verifyManager = require("../middleware/verifyManager");


// For User to amend the booking

// 1. Make new booking by a customer
router.post("/bookingid", async (req, res, next) => {
  try {
    const { customerId } = req.body;

    // check if customer exists
    const customer = await Customer.findByPk(customerId);
    if(!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // get all items in the basket for the customer
    const basketItems = await Basket.findAll({ where: { customerId } });
    if (!basketItems || basketItems.length === 0) {
      return res.status(404).json({ message: "Basket is empty" });
    }

    // create an array to store all the bookings created
    const bookings = [];
    // create a booking for each item in the basket
    for (const basketItem of basketItems) {
      let bookingType;
      let bookingTypeId;
      let number;
      let end;
      let facilityName;

      // check if activity or class exists
      if (basketItem.basketType === "activity") {
        const activity = await Activity.findOne({ where: {activityId: basketItem.activityId } });
        if (!activity) 
          return res.status(404).json("This activity is not available at any facility");    
        // set endTime for "Team events" to be +2hr after startTime
        // other activities +1hr
        if (activity.activityName === "Team events") {
          const facility = await Facility.findOne({ where: { facilityName: basketItem.facilityName } });
          if (!facility) {
            return res.status(404).json('Facility not found');
          }
          number = facility.capacity;
          end = moment.duration(basketItem.startTime).add(moment.duration('02:00:00'));
        } else {
          number = "1";
          end = moment.duration(basketItem.startTime).add(moment.duration('01:00:00'));
        }
        bookingType = "activity";
        bookingTypeId = basketItem.itemId;
        facilityName = basketItem.facilityName;
      } 
      else if (basketItem.basketType === "class") {
        const classes = await Classes.findOne({ where: {classId: basketItem.classId, facilityName: basketItem.facilityName } });
        if (!classes) {
          return res.status(404).json("This class is not available at any facility");
        }

        // set endTime for classes to be +1hr after startTime
        number = "1";
        end = moment.duration(basketItem.startTime).add(moment.duration('01:00:00'));
        bookingType = "class";
        bookingTypeId = basketItem.itemId;
        facilityName = basketItem.facilityName;
      } 
      else {
        return res.status(400).json("No bookings were made");
      }

      // format the endTime
      end = moment.utc(end.as('milliseconds')).format("HH:mm:ss");
      
      // create the new booking
      const newBooking = await Booking.create({
        noOfPeople: number,
        date: basketItem.date,
        startTime: basketItem.startTime,
        endTime: end,
        bookingType,
        customerId,
        [`${bookingType}Id`]: bookingTypeId,
        activityId: basketItem.activityId,
        classId: basketItem.classId,
        facilityName: basketItem.facilityName
      });
      
      // add the newly created booking to the array of bookings
      bookings.push(newBooking);

      // delete basket item
      await Basket.destroy({ where: { basketId: basketItem.basketId } });
    }
    return res.status(200).json(bookings);
  } catch (err) {
    next(err)
  }
});

// 2. Update an existing booking
router.put("/:id", async (req, res, next) => {
  try {
    const updateBooking = await Booking.findByPk(req.params.id);
    const updatedBooking = await updateBooking.update(req.body);
    return res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
});

// 3. Delete booking
router.delete("/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if(!booking) return res.status(404).json("Booking not found");
    else { 
      // find the associated staff bookings for the booking being deleted
      const staffBookings = await StaffBooking.findAll({ where: { bookingId: booking.bookingId } });
      // delete each staff booking
      await Promise.all(staffBookings.map((sb) => sb.destroy()));
      // delete the booking
      await booking.destroy(req.body);
      res.status(200).json("Booking deleted");
    };
  } catch (err) {
    next(err);
  }
});

// 4. Get a booking
router.get("/find/:id", async (req, res, next) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// 5. Get all bookings
router.get("/", async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// 6. Get all bookings made by a customer
router.get("/bookings/:customerId", async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    const customer = await Customer.findByPk(customerId);

    if (!customer) {
      return res.status(404).json("Customer not found");
    }

    const bookings = await Booking.findAll({
      where: { customerId },
    });

    return res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
});

// 7. Add new bookings made by a staff member 
router.post("/staff-booking", async (req, res, next) => {
  try {
    const {
      customerId,
      staffId,
      date,
      start,
      activityId,
      classId,
      facilityName,
      paymentId,
    } = req.body;

    // Check if the specified activity or class exists
    let bookingType;
    let bookingTypeId;
    let end;
    if (activityId) {
      const activity = await Activity.findOne({ where: {activityId, facilityName} });
      if (!activity) return res.status(404).json("This activity is not available at this facility");
      bookingType = "activity";
      bookingTypeId = activityId;
      
      // set endTime for "Team events" to be +2hr after startTime
      // other activities +1hr
      if (activity.activityName === "Team events (2-hours)") {
        end = moment.duration(start).add(moment.duration('02:00:00'));
      } else {
        end = moment.duration(start).add(moment.duration('01:00:00'));
      }
    } 
    else if (classId) {
      const classes = await Classes.findOne({ where: {classId, facilityName} });
      if (!classes) return res.status(404).json("This class is not available at this facility");
      bookingType = "class";
      bookingTypeId = classId;

      // set endTime for classes to be +1hr after startTime
      end = moment.duration(start).add(moment.duration('01:00:00'));
    } 
    else 
      return res.status(400).json("No bookings were made");

    // Check if valid customer and staff
    const customer = await Customer.findByPk(customerId);
    if (!customer) return res.status(404).json("Customer not found");

    const staff = await Staff.findByPk(staffId);
    if (!staff) return res.status(404).json("Staff not found");

    // Check if booking already exists
    const existingBooking = await Booking.findOne({ where: { customerId, date, facilityName, startTime: start} });
    if (existingBooking) return res.status(401).json("Booking already exists");

    // format the endTime
    end = moment.utc(end.as('milliseconds')).format("HH:mm:ss");
    let number = 1;

    // Create the booking and staff booking
    const booking = await Booking.create({
            noOfPeople: number,
            date,
            startTime: start,
            endTime: end,
            bookingType,
            customerId,
            staffId,
            ['${bookingType}Id']: bookingTypeId,
            facilityName,
            paymentId,
            activityId,
            classId
    });
    
    await StaffBooking.create({
      staffId: staffId,
      bookingId: booking.bookingId,
    });
    return res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
});

module.exports=router;