const Sequelize = require("sequelize");
const db = require("../db");
// const Facility = require("./facility");
// const Payment = require("./payment");

const { INTEGER, STRING, DATE, TIME, FLOAT } = Sequelize;

const Classes = db.define('Classes', {
    classId: {
        type: INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    className: {
        type: STRING,
        allowNull: false
    },
    date: {
        type: DATE
    },
    time: {
        type: TIME
    },
    price: {
        type: FLOAT,
        allowNull: false
    }
});

// add foreign key constraint
// Classes.belongsTo(Payment, { foreignKey: 'paymentId' });
// Classes.belongsTo(Facility, { foreignKey: 'facilityId' });

module.exports = Classes;