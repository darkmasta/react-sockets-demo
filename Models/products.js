var mongoose = require("mongoose");
var Products = require("../Schemas/products_schema");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Database connection succeeded.");
});

var Product = mongoose.model("Product", Products.productSchema);

module.exports.Product = Product;
