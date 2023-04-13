const { Schema, model } = require("mongoose");

const WishSchema = Schema({
  wish: {
    type: String,
    required: true,
  },
  wishId: {
    type: String,
    required: true,
  },
});

module.exports = model("Wish", WishSchema); 