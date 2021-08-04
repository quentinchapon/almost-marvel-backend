const express = require("express");
const router = express();

// Comics route

router.get("/comics", async (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

module.exports = router;
