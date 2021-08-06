const express = require("express");
const axios = require("axios");
const router = express();

// Display comics list with filters

router.get("/comics", async (req, res) => {
  try {
    const filters = {};

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&search=${req.query.search}`
    );

    // Recherche sur le titre
    if (req.query.search) {
      // Add search key in search object
      console.log(req.query.search);
      filters.search = new RegExp(req.query.search, "i");
      {
        search: new RegExp(req.query.search, "i");
      }
    }
    /////////////////////////

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all comics for one character

router.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(req.query.params);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
