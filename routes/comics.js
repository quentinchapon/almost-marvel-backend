const express = require("express");
const router = express();

// Comics route

router.get("/comics", async (req, res) => {
  try {
    res.json("Ok");
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

module.exports = router;
