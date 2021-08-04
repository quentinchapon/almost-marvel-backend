require("dotenv").config();

// import axios from "axios";

const express = require("express");
const app = express();

const formidable = require("express-formidable");
app.use(formidable());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");

const morgan = require("morgan");
app.use(morgan("dev"));

//Port var
const port = 3000;

//Routes importation

// API INTERROGATION

// DB connection
mongoose.connect("mongodb://localhost:27017/almost-vinted", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", async (req, res) => {
  try {
    res.json("Route base OK");
  } catch (error) {
    res.status(400).json({ message: "An error occured" });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server started");
});
