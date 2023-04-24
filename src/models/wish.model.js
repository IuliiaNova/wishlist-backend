const { Schema, model } = require("mongoose");

const WishSchema = new Schema({
  wishTitle: {
    type: String,
    required: [true, 'The title is requered'],
  },
  state: {
    type: String,
    default: String
  }, 
  key: {
    type: String
  }
});

module.exports = model("Wish", WishSchema)