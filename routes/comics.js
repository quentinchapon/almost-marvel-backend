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

// Get all comics for one character

router.get("/comics/character:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.query.itemDatas}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(req.query.itemDatas);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
