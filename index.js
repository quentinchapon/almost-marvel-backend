require("dotenv").config();

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
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const userRoutes = require("./routes/user");
app.use(userRoutes);

// Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", async (req, res) => {
  try {
    res.json("Welcome on Almost Marvel API");
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

// process.env.PORT
