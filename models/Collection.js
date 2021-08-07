const mongoose = require("mongoose");

const Collection = mongoose.model("Collection", {
  token: {
    type: String,
    required: true,
  },
  collection_img: {
    type: String,
  },
  collection_name: {
    type: String,
  },
});

module.exports = Collection;
