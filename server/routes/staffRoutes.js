//glue for libraries
const express = require("express");
const router = express.Router()
const pool = require("../database/db")

//ROUTES//
 
//create new customer//
router.post("/customer", async (req, res)=>{
    //console.log(req.body);
    const { description } = req.body;
    try {
        const newCustomer = await pool.query("INSERT INTO customers (description) VALUES($1) RETURNING *", //adding data so RETURNING gets back the data, same for update
        [description]
        );

        res.json(newCustomer.rows[0]); //where the data is located at
        
    } catch (err) {
        console.error(err.message);
    }

})

//get all customer// 

router.get("/customer", async(req, res) => {
    try {
        const allCustomers = await pool.query("SELECT * from customers"); //no returning * because SELECT does that
        res.json(allCustomers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one customer//

router.get("/customer/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const customers = await pool.query("SELECT * from customers WHERE customer_id = $1", [id]) //where clause to specify 

        res.json(customers.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

//update a customer detail//

router.put("/customer/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateCustomer = await pool.query("UPDATE customers SET description = $1 WHERE customer_id = $2", //$xxx variable holder w params
        [description, id]
        ); //dolar signs are variable holders

        res.json("Customer details updated");
    } catch (err) {
        console.error(err.message);
    }
})

//delete a customer//

router.delete("/customer/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteCustomer = await pool.query("DELETE FROM customers WHERE customer_id = $1", 
        [id]);

        res.json("Customer deleted from database");
    } catch (err) {
        console.error(err.message);
    }
})

//create new activity//

router.post("/activities", async (req, res)=>{

    try {

        //console.log(req.body);
        const { description } = req.body;
        const newActivity = await pool.query("INSERT INTO activities (description) VALUES($1) RETURNING *", //adding data so RETURNING gets back the data, same for update
        [description]
        );

        res.json(newActivity.rows[0]); //where the data is located at
        
    } catch (err) {
        console.error(err.message);
    }

})

//get all activity//

router.get("/activities", async(req, res) => {
    try {
        const allActivities = await pool.query("SELECT * from activities"); //no returning * because SELECT does that
        res.json(allActivities.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one activity//

router.get("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const activity = await pool.query("SELECT * from activities WHERE activity_id = $1", [id]) //where clause to specify 

        res.json(activity.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

//update an activity//

router.put("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateActivity = await pool.query("UPDATE activities SET description = $1 WHERE activity_id = $2", //$xxx variable holder w params
        [description, id]
        ); //dolar signs are variable holders

        res.json("Activity details updated");
    } catch (err) {
        console.error(err.message);
    }
})


//delete an activity//

router.delete("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteActivity = await pool.query("DELETE FROM activities WHERE activity_id = $1", 
        [id]);

        res.json("Activity deleted from database");
    } catch (err) {
        console.error(err.message);
    }
})


//create new staff//

router.post("/staff", async (req, res)=>{

    try {

        //console.log(req.body);
        const { staff_id } = req.body;
        const { staff_name } = req.body;
        const { staff_number } = req.body;
        const { staff_email } = req.body;
        const { staff_title } = req.body;
        const newStaff = await pool.query("INSERT INTO staff (staff_id, staff_name, staff_number, staff_email, staff_title) VALUES($1, $2, $3, $4, $5) RETURNING *", //adding data so RETURNING gets back the data, same for update
        [staff_id, staff_name, staff_number, staff_email, staff_title]
        );

        res.json(newStaff.rows[0]); //where the data is located at
        
    } catch (err) {
        console.error(err.message);
    }

})

//get all staff//

router.get("/staff", async(req, res) => {
    try {
        const allStaff = await pool.query("SELECT * from staff"); //no returning * because SELECT does that
        res.json(allStaff.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one staff//

router.get("/staff/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const staff = await pool.query("SELECT * from staff WHERE staff_id = $1", [id]) //where clause to specify 

        res.json(staff.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

//update a staff//

//dolar signs are variable holders
/*app.put("/staff/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {staff_name} = req.body;
        const {staff_number} = req.body;
        const {staff_email} = req.body;
        const {staff_title} = req.body;
        const updateStaff = await pool.query("UPDATE staff SET staff_name = $1 WHERE staff_id = $2", //$xxx variable holder w params
        [staff_name, id]) */
        
        /*const updateStaff = await pool.query("UPDATE staff SET (staff_name = $1, staff_number = $2, staff_email = $3, staff_title = $4) WHERE staff_id = $5", //$xxx variable holder w params
        [staff_name, staff_number, staff_email, staff_title, staff_id])*/

        /*res.json("Staff details updated");
    } catch (err) {
        console.error(err.message);
    }
})*/


//delete a staff//

router.delete("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteActivity = await pool.query("DELETE FROM activities WHERE activity_id = $1", 
        [id]);

        res.json("Activity deleted from database");
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;

//ROUTES_END//