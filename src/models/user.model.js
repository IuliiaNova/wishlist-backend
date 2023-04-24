const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please put your name']
  },
  email: {
    type: String,
    required: [true, 'Please put your email']
  },
  password: {
    type: String,
  },
  userID: {
    type: String,
    required: true
  },
  wishes: [
    {
      type: [Schema.Types.ObjectId],
      ref: 'Wish',
      require: true,
      default: []
    },
  ]
});

module.exports = model('User', UserSchema)