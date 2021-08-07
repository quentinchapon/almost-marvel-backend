const mongoose = require("mongoose");

const Fav = mongoose.model("Fav", {
  token: {
    type: String,
  },
  fav_img: {
    type: String,
  },
  fav_name: {
    type: String,
  },
});

module.exports = Fav;
