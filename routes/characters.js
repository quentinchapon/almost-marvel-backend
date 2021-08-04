const express = require("express");
const router = express();

// Characters route

router.get("/characters", async (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

module.exports = router;
