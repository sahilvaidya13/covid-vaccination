const mongoose = require("mongoose");

const PropUserSchema = mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model("propusers", PropUserSchema);
