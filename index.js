require("dotenv").config();

const axios = require("axios");

const express = require("express");
const app = express();

const formidable = require("express-formidable");
app.use(formidable());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

const morgan = require("morgan");
const { response } = require("express");
app.use(morgan("dev"));

//Port var
const port = 3000;

//Routes importation

// API INTERROGATION

// DB connection
// mongoose.connect("mongodb://localhost:27017/almost-vinted", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

app.get("/", async (req, res) => {
  try {
    res.json("Welcome on Almost Marvel API");
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

app.get("/characters", async (req, res) => {
  try {
    axios
      .get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`
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

app.all("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
