const express = require("express"); //imports express
const mongoose = require("mongoose"); // import mongoose (tool thats of mongoDB)
const cors = require("cors"); // imports cors: lets your frontend talk to the backend
require("dotenv").config();
console.log("ENV:",process.env.MONGO_URI);

const app =express(); // not really for app of a phone but of ther server

app.listen(cors());
//enables your react app to make requests to your server
app.use(express.json());// allows server to read JSON data front frontend

