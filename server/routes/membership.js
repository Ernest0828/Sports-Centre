import express from "express";
const router = express.Router();
import Customer from "../database/models/customer.js";
import Membership from "../database/models/membership.js";
import verifyManager from "../middleware/verifyManager.js";
import verifyStaff from "../middleware/verifyStaff.js";
import verifyUser from "../middleware/verifyUser.js";


// 1. Buy a membership
router.post("/buy/:id", verifyUser, async (req, res, next) => {
  try {
    const { membershipType } = req.body;
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json("Customer not found");
    }

    // If customer already has a membership, return an error
    if (customer.isMembership) {
      return res.status(400).json("Customer already has a membership");
    }

    // Set membership start and end dates based on membership type
    let startDate = new Date();
    let endDate = new Date();
    if (membershipType === 'monthly') {
      endDate.setDate(endDate.getDate() + 30);
    } else if (membershipType === 'annually') {
      endDate.setDate(endDate.getDate() + 365);
    }

    // Update customer's membership status and type
    customer.isMembership = true;
    customer.membershipType = membershipType;

    // Update customer in the database
    await customer.save();

    // Create membership record in the database
    await Membership.create({
      customerId: req.params.id,
      membershipType: membershipType,
      startDate: startDate,
      endDate: endDate
    });

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
});

// 2. Cancel membership
router.post("/cancel/:id", verifyUser, async (req, res, next) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json("Customer not found");
    }

    if (!customer.isMembership) {
      return res.status(400).json("Customer does not have a membership");
    }

    const membership = await Membership.findOne({ where: { customerId: customer.customerId } });
    if (!membership) {
      return res.status(500).json("Membership record not found");
    }

    // Delete the membership record from the database
    await membership.destroy();

    const updatedCustomer = await customer.update({ isMembership: false , membershipType: null});
    // Update customer in the database
    await customer.save();
    res.status(200).json(updatedCustomer);
  } catch (err) {
    next(err);
  }
});

// 3. Update a membership
router.put("/update/:id", verifyUser, async (req, res, next) => {
  try {
    const { membershipType } = req.body;

    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json("Customer not found");
    }

    let membership = await Membership.findOne({ where: { customerId: req.params.id } });
    if (!membership) {
      return res.status(404).json("Membership not found");
    }

    // If the new membership type is different than the current one,
    // update the membership start and end dates accordingly
    if (membershipType !== membership.membershipType) {
      if (membershipType === "monthly") {
        // Set start date to previous membership end date if available, current date otherwise
        const startDate = membership.endDate ? membership.endDate : new Date();
        membership.startDate = startDate;

        // Set end date to 30 days after start date
        const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        membership.endDate = endDate;
      } else if (membershipType === "annually") {
        // Set start date to previous membership end date if available, current date otherwise
        const startDate = membership.endDate ? membership.endDate : new Date();
        membership.startDate = startDate;

        // Set end date to 365 days after start date
        const endDate = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
        membership.endDate = endDate;
      }

      // Update the membership type
      membership.membershipType = membershipType;

      // Save the updated membership
      await membership.save();
    }

    // Update the customer's membership status
    customer.isMembership = true;
    customer.membershipType = membershipType;

    // Save the updated customer
    await customer.save();

    res.status(200).json(customer);
  } catch (err) {
    next(err);
  }
});

// 4. Get all customer memberships (for staffs)
router.get("/memberships", verifyStaff, async (req, res, next) => {
  try {
    const memberships = await Membership.findAll({
      include: [{ model: Customer }],
    });
    res.status(200).json(memberships);
  } catch (err) {
    next(err);
  }
});

export default router