const Sequelize = require("sequelize");
const db = require("../db");
// const Customer = require("./customer");
// const Payment = require("./payment");

const { STRING, DATE } = Sequelize;

const Membership = db.define('Membership', {
    membershipType: {
        type: STRING,
        allowNull: false
    },
    startDate: {
        type: DATE,
        allowNull: true
    },
    endDate: {
        type: DATE,
        allowNull: true
    }
});

// Membership.belongsTo(Customer, { foreignKey: 'customerId'});
// Membership.belongsTo(Payment, { foreignKey: 'paymentId' });

module.exports = Membership;