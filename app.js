require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var cors = require("cors");
var http = require("http");
var socketIo = require("socket.io");
var fs = require("fs");
var bodyParser = require("body-parser");

var moment = require("moment");
var https = require("https");
moment.locale("en");
const path = require("path");

const PORT = process.env.PORT || 5000;

// lets require/import the mongodb native drivers.
var mongodb = require("mongodb");
var mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

var Products = require("./Models/products");
var _ = require("underscore");

const ProductRoutes = require("./routes/product_routes");

var app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000", // dev to prod
  })
);
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: false }));
var jsonParser = bodyParser.json();

app.use("/", ProductRoutes);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var cons = require("consolidate");
app.engine("html", cons.swig);
app.use(express.static(__dirname + "/frontend/public"));
app.set("views", __dirname + "/frontend/public");
app.set("view engine", "html");

app.get("/dist", function (req, res) {});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/images/:id", jsonParser, function (req, res) {
  var id = req.params.id;

  path.resolve("temp/index.html");
  res.sendFile(id, { root: "./images" });
});

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  var promise = Products.Product.find({});

  promise.then(function (doc) {
    socket.emit("Update", doc);
  });
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
