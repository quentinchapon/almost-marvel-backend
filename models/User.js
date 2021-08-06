const mongoose = require("mongoose");

const User = mongoose.model("User", {
  email: {
    required: true,
    unique: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },

  password: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
