const { Schema, model } = require("mongoose");

const WishSchema = Schema({
  wishTitle: {
    type: String,
    required: [true, 'The title is requered'],
  },
  state: {
    type: String,
    default: String
  }
});

const WishModel = model("Wish", WishSchema)

module.exports = WishModel 
 