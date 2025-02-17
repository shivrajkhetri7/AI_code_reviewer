const express = require('express');
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const router  =require('./routers/router');


const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        status: "success"
    })
})

app.use("/", router);

app.listen(PORT, () => {
    console.log(`server is running on the http://localhost:${PORT}`);
})