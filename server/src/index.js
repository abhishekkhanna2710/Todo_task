require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');


// middlewares
app.use(express.json())
app.use(cors());


const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World from Abhishek");
})

app.listen(5000, () => {
    console.log(`Server has started on http://localhost:${port}`)
})