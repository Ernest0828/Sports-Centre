//glue for libraries
const express = require("express");
const app = express(); //variable that takes express library and runs it  
const cors = require("cors");
const pool = require("./db")

//middleware  
app.use(cors());
//request data from client side, request body object
app.use(express.json()); //req.body

//ROUTES//
 
//create new customer//
app.post("/customer", async (req, res)=>{

    try {

        //console.log(req.body);
        const { description } = req.body;
        const newCustomer = await pool.query("INSERT INTO customers (description) VALUES($1) RETURNING *", //adding data so RETURNING gets back the data, same for update
        [description]
        );

        res.json(newCustomer.rows[0]); //where the data is located at
        
    } catch (err) {
        console.error(err.message);
    }

})

//get all customer// 

app.get("/customer", async(req, res) => {
    try {
        const allCustomers = await pool.query("SELECT * from customers"); //no returning * because SELECT does that
        res.json(allCustomers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one customer//

app.get("/customer/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const customers = await pool.query("SELECT * from customers WHERE customer_id = $1", [id]) //where clause to specify 

        res.json(customers.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

//update a customer detail//

app.put("/customer/:id", async(req, res) => {
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

app.delete("/customer/:id", async(req, res) => {
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

app.post("/activities", async (req, res)=>{

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

app.get("/activities", async(req, res) => {
    try {
        const allActivities = await pool.query("SELECT * from activities"); //no returning * because SELECT does that
        res.json(allActivities.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get one activity//

app.get("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const activity = await pool.query("SELECT * from activities WHERE activity_id = $1", [id]) //where clause to specify 

        res.json(activity.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
})

//update an activity//

app.put("/activities/:id", async(req, res) => {
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

app.delete("/activities/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteActivity = await pool.query("DELETE FROM activities WHERE activity_id = $1", 
        [id]);

        res.json("Activity deleted from database");
    } catch (err) {
        console.error(err.message);
    }
})

//ROUTES_END//

app.listen(4000, () =>{
    console.log("server has started on port 4000");
});

//nodemon index: everytime a change is made it will auto restart 