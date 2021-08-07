const express = require("express");
const router = express();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Models import
const Fav = require("../models/Fav");
const User = require("../models/User");

// Sign up route
router.post("/signup", async (req, res) => {
  try {
    // Check if email already exist in database
    const checkEmail = await User.findOne({ email: req.fields.email });
    // If email doesn't exist, password encryption
    if (!checkEmail) {
      const generatedSalt = uid2(16);
      const generatedHash = SHA256(
        req.fields.password + generatedSalt
      ).toString(encBase64);
      const generatedToken = uid2(64);
      const newUser = new User({
        email: req.fields.email,
        username: req.fields.username,
        token: generatedToken,
        hash: generatedHash,
        salt: generatedSalt,
      });
      await newUser.save();

      //res.json("User created");
      res.status(200).json({
        id: newUser._id,
        token: newUser.token,
        username: newUser.username,
      });
    } else {
      res.status(400).json({ message: "This e-mail adresse already exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign in route
router.post("/signin", async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.fields.email });
    const checkHash = SHA256(req.fields.password + checkUser.salt).toString(
      encBase64
    );
    if (checkUser.hash === checkHash) {
      res.status(200).json({
        _id: checkUser._id,
        token: checkUser.token,
        username: checkUser.username,
      });
    } else {
      res.status(200).json({ message: "Wrong password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Add to fav route / Create new fav
router.post("/fav", async (req, res) => {
  try {
    const newFav = new Fav({
      token: req.fields.token,
      fav_img: req.fields.fav_img,
      fav_name: req.fields.fav_name,
    });
    await newFav.save();
    res.json(newFav);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
