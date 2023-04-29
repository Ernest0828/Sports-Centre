const Sequelize = require("sequelize");
const db = require("../db");
const Facility = require("./facility")
const Staff = require("./staff")
const Activity = require("./activity")
const Customer = require("./customer")
const Classes = require("./classes")
const Booking = require("./booking")

const { INTEGER, DATE, TIME, ENUM, FLOAT } = Sequelize;

const Basket = db.define('Basket', {
    basketId: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    date: {
        type: DATE,
        allowNull: false
    },
    startTime: {
        type: TIME,
        allowNull: false
    },
    endTime: {
        type: TIME,
        allowNull: false
    },
    price: {
        type: FLOAT,
        allowNull: false
    },
    basketType: {
        type: ENUM('activity', 'class'),
        allowNull: false
  },
});

// add foreign key constraint
Basket.belongsTo(Customer, { foreignKey: 'customerId' });
Basket.belongsTo(Activity, { foreignKey: 'activityId', allowNull: true });
Basket.belongsTo(Classes, { foreignKey: 'classId', allowNull: true });
Basket.belongsTo(Facility, { foreignKey: 'facilityName' });

module.exports=Basket;