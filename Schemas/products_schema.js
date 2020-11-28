var mongoose = require("mongoose");
var Float = require("mongoose-float").loadType(mongoose, 5);

var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  id: String,
  img: String,
  price: Number,
  price_history: [Number],
  category: [String],
  date: { type: Date, default: Date.now },
});

module.exports.productSchema = productSchema;
