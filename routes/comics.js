const express = require("express");
const axios = require("axios");
const router = express();

// Models import
const Collection = require("../models/Collection");
const User = require("../models/User");

// Display comics list with filters
router.get("/comics", async (req, res) => {
  try {
    const filters = {};

    // Recherche sur le titre
    if (req.query.title) {
      // Add search key in search object
      filters.title = new RegExp(req.query.title, "i");
      // {
      //   title: new RegExp(req.query.title, "i");
      // }
    }
    /////////////////////////

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${req.query.title}&skip=${req.query.skip}&limit=20&apiKey=${process.env.MARVEL_API_KEY}`
    );

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
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
