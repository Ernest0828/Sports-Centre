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
const Membership = require("./models/membership");

// relation between tables
// 1. Customer has many to one relation with Booking
Customer.hasMany(Booking);
Booking.belongsTo(Customer);

// 2. Customer has one to one relation with Payment
Customer.hasOne(Payment);
Payment.belongsTo(Customer);

// 3. Staff has many to many relation with Booking
Staff.belongsToMany(Booking, { through: StaffBooking });
Booking.belongsToMany(Staff, { through: StaffBooking });

// 4. Payment has one to many relation with Booking
Payment.hasMany(Booking);
Booking.belongsTo(Payment);

// 5. Activity has one to one relation with Booking
Activity.hasOne(Booking);
Booking.belongsTo(Activity);

// 6. Classes has one to one relation with Booking
Classes.hasOne(Booking);
Booking.belongsTo(Classes);

// 7. Facility has one to one relation with Booking
Facility.hasOne(Booking);
Booking.belongsTo(Facility);

// 8. Facility has one to many relation with with Activity
Facility.hasMany(Activity);
Activity.belongsTo(Facility);

// 9. Facility has one to many relation with with Classes
Facility.hasMany(Classes);
Classes.belongsTo(Facility);

// 10. Customer has one to one relation with Membership
Customer.hasOne(Membership);
Membership.belongsTo(Customer);

// 11. Payment has one to one relation with Membership
Payment.hasOne(Membership);
Membership.belongsTo(Payment);

db
    .sync( {force:true})
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
    Classes,
    Membership;

