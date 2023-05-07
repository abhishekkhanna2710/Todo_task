require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const connection = require("./db/Connection.js")
const todoRoutes = require("./Routes/TaskRoutes.js")



// Database connection
connection();

// middlewares
app.use(express.json())
app.use(cors());


//router file linked
app.use("/api/todo", todoRoutes);


const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(5000, () => {
    console.log(`Server has started on http://localhost:${port}`)
})