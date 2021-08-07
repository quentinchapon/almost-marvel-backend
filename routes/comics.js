const express = require("express");
const axios = require("axios");
const router = express();

// Models import
const Fav = require("../models/Fav");
const User = require("../models/User");

// Display comics list with filters

router.get("/comics", async (req, res) => {
  try {
    const filters = {};

    // Recherche sur le titre
    if (req.query.title) {
      // Add search key in search object
      console.log(req.query.title);
      filters.title = new RegExp(req.query.title, "i");
      // {
      //   title: new RegExp(req.query.title, "i");
      // }
    }
    /////////////////////////

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${req.query.title}&apiKey=${process.env.MARVEL_API_KEY}`
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
    console.log(req.query.params);
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
