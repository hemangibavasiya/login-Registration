const { error } = require("console");
const express = require("express");
const path = require("path");
const pageRouter = require("./routes/pages");
const api = require("./apis/add-category");
const dotenv = require('dotenv')
dotenv.config()

const dbCon = require('./repository/db')

global.db = dbCon.connect()
require('./model/modelExport')

const app = express();

//for body parser
app.use(express.urlencoded({ extended: false }));

//static file
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

//template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//let's serve the index page
// app.get("/", function (req, res) {
//   res.render("index");
// });

//routers
app.use("/", pageRouter);

//error: page not found
app.use((req, res, next) => {
  var err = new Error("Page not found");
  err.status = 404;
  next(err);
});

//error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

//set server
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});

module.exports = app;
