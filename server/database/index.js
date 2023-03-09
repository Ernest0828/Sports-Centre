// access point for all database related things
const db = require("./db");

const Customer = require("./models/customer");
const Staff = require("./models/staff");
const StaffBooking = require("./models/staffBooking");
const Booking = require("./models/booking");
const Activity = require("./models/activity");
const Facility = require("./models/facility");
const Payment = require("./models/payment");
const Classes = require("./models/classes");

// relation between tables
// Customer.hasMany(Booking);
// Booking.belongsTo(Customer);

// Customer.hasMany(Payment);
// Payment.belongsTo(Customer);

// Staff.belongsToMany(Booking, { through: StaffBooking });
// Booking.belongsToMany(Staff, { through: StaffBooking });

db
    .sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

 module.exports =
    db,
    Customer,
    Staff,
    StaffBooking,
    Booking,
    Activity,
    Facility,
    Payment,
    Classes;

