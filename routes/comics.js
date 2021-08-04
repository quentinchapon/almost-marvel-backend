const express = require("express");
const axios = require("axios");
const router = express();

// Comics route

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
