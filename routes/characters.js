const express = require("express");
const axios = require("axios");
const router = express();

// Characters route

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${req.query.name}&apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
