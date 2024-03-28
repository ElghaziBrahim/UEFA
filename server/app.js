const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
const userRoute = require("./routes/userRoute")
const alldataController = require("./controllers/alldataController")
const dataRoute=require("./routes/dataRoute")
const app = express();

mongoose.connect(process.env.DataBase_URL)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userRoute);
app.use('/data', dataRoute);


app.listen(3000, () => { console.log(`Server is running on port 3000`); });