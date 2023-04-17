const { Schema, model } = require("mongoose");

const WishSchema = Schema({
  wishTitle: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: String
  }
});

module.exports = model("Wish", WishSchema); 