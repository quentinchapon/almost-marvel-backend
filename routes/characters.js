const express = require("express");
const axios = require("axios");
const router = express();

// Models import
const Collection = require("../models/Collection");
const User = require("../models/User");

// Characters route

router.get("/characters", async (req, res) => {
  try {
    const filters = {};

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${req.query.name}&skip=${req.query.skip}&apiKey=${process.env.MARVEL_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
