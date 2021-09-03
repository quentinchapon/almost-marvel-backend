const express = require("express");
const router = express();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Models import
const Collection = require("../models/Collection");
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

// Sign in
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

//Add to collection
router.post("/collection", async (req, res) => {
  const checkCollectionName = await Collection.findOne({
    collection_name: req.fields.collection_name,
  });
  if (checkCollectionName === null) {
    try {
      const newCollection = new Collection({
        user_id: req.fields.user_id,
        collection_img: req.fields.collection_img,
        collection_name: req.fields.collection_name,
      });

      await newCollection.save();
      res.json(newCollection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.json({ message: "This item is already in your collecton" });
  }
});

//Get user collection
router.get("/getcollection", async (req, res) => {
  try {
    const collection = await Collection.find({ user_id: req.query.user_id });
    res.json(collection);
  } catch (error) {
    console.log(error.message);
  }
});

//Remove from collection
router.delete("/collection/delete", async (req, res) => {
  try {
    const deleteCollection = await Collection.remove({
      collection_name: req.query.collection_name,
    });
    res.json({ message: "item has been deleted" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
