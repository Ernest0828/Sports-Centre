const express = require('express');
const app = express();
const cors = require("cors");

const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('<h1>GymCorp</h1>');
// });

app.use("/auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});