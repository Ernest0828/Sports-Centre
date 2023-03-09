const Sequelize = require("sequelize");
const db = require("../db");
const Customer = require("./customer");
const Staff = require("./staff");
const Activity = require("./activity");
const Facility = require("./facility");
const Payment = require("./payment")

const { INTEGER, STRING, DATE, TIME } = Sequelize;

const Booking = db.define('Booking', {
    bookingId: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    activityName: {
        type: STRING,
        allowNull: false
    },
    date: {
        type: DATE
    },
    time: {
        type: TIME
    }
});

// add foreign key constraint
Booking.belongsTo(Customer, { foreignKey: 'customerId' });
Booking.belongsTo(Staff, { foreignKey: 'staffId' });
Booking.belongsTo(Activity, { foreignKey: 'activityId' });
Booking.belongsTo(Payment, { foreignKey: 'paymentId' });
Booking.belongsTo(Facility, { foreignKey: 'facilityId' });

module.exports = Booking;