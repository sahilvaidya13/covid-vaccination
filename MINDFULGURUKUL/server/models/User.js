const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: String,
  },
  gender: {
    require: true,
    type: String,
  },
  city: {
    require: true,
    type: String,
  },
  state: {
    require: true,
    type: String,
  },

  email: {
    require: true,
    type: String,
  },
  pass: {
    type: String,
  },
  propsUsers: [
    {
      name: String,
      email: String,
      phone: String,
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
