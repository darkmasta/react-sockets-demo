require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var router = express.Router();

var Products = require("../Models/products");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var _ = require("underscore");
var CryptoJS = require("crypto-js");
const { ObjectID } = require("mongodb");
var axios = require("axios");

router.get("/products", function (req, res) {
  var promise = Products.Product.find();

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.get("/products/:id", jsonParser, function (req, res) {
  var id = req.params.id;
  var promise = Products.Product.find({ id: id });

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

router.delete("/products/:id", jsonParser, function (req, res) {
  var id = req.params.id;

  var promise = Products.Product.deleteOne({ id: id });

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.delete("/products/", jsonParser, function (req, res) {
  var promise = Products.Product.deleteMany({});

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/products", jsonParser, function (req, res) {
  var productData = req.body;
  console.log(req.body);

  var Product = new Products.Product({
    id: productData.id,
    name: productData.name,
    price: productData.price,
  });

  var promise = Product.save();

  promise.then(function (doc) {
    res.json(doc);
  });
});

router.post("/products/:id", jsonParser, function (req, res) {
  var productData = req.body;
  var id = req.params.id;

  var query = { id: productData.id };
  var update = {
    name: productData.name,
    price: productData.price,
  };

  var options = { upsert: true, new: true, setDefaultsOnInsert: true };

  Products.Product.findOneAndUpdate(
    query,
    update,
    options,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.json(result);
    }
  );
});

module.exports = router;
