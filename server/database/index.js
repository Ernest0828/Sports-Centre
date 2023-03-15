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
Customer.hasMany(Booking, { foreignKey: "customerId" });
Booking.belongsTo(Customer, { foreignKey: "customerId" });

// 2. Customer has one to one relation with Payment
Customer.hasOne(Payment, { foreignKey: "customerId" });
Payment.belongsTo(Customer, { foreignKey: "customerId" });

// 3. Staff has many to many relation with Booking
Staff.belongsToMany(Booking, { through: StaffBooking });
Booking.belongsToMany(Staff, { through: StaffBooking });

// 4. Payment has one to many relation with Booking
Payment.hasMany(Booking, { foreignKey: "paymentId" });
Booking.belongsTo(Payment, { foreignKey: "paymentId" });

// 5. Activity has one to one relation with Booking
Activity.hasOne(Booking, { foreignKey: "activityId" });
Booking.belongsTo(Activity, { foreignKey: "activityId" });

// 6. Classes has one to one relation with Booking
Classes.hasOne(Booking, { foreignKey: "classId" });
Booking.belongsTo(Classes, { foreignKey: "classId" });

// 7. Facility has one to one relation with Booking
Facility.hasOne(Booking, { foreignKey: "facilityId" });
Booking.belongsTo(Facility, { foreignKey: "facilityId" });

// 8. Facility has one to many relation with with Activity
Facility.hasMany(Activity, { foreignKey: "facilityId" });
Activity.belongsTo(Facility, { foreignKey: "facilityId" });

// 9. Facility has one to many relation with with Classes
Facility.hasMany(Classes, { foreignKey: "facilityId" });
Classes.belongsTo(Facility, { foreignKey: "facilityId" });

// 10. Customer has one to one relation with Membership
Customer.hasOne(Membership, { foreignKey: "customerId" });
Membership.belongsTo(Customer, { foreignKey: "customerId" });

// 11. Payment has one to one relation with Membership
Payment.hasOne(Membership, { foreignKey: "paymentId" });
Membership.belongsTo(Payment, { foreignKey: "paymentId" });

db
    .sync({force:true})
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

