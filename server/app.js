const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const publicPath = path.join(__dirname, "../dist");
//UserModel defines how the document (i.e. record) in database looks like (from what props consist of (i.e. columns)).
const UserModel = require("./models/user.js");

//import db/mongoose.js to connect to database
const { mongoose } = require("./db/mongoose.js");
//REST API routes
const taskRoute = require("./routes/taskRoute");
const compression = require("compression");

const app = express();
app.use(compression());
app.use(express.static(publicPath));
// handling middleware (parsing post body got from client)
app.use(bodyParser.json());

// REST API handler is pushed to separate file, where express.Router() is used to define the API. Then it is imported in main server.js (testRoute) and registered. It is usefull to organize code and keep different routes in separate files
app.use(taskRoute);

module.exports = app;
