const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const Note = require("./models/noteModel");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// dotenv.config();

//Routes

// Add Product
app.post("/note", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get Notes
app.get("/note", async (req, res) => {
  try {
    const notes = await Note.find({});

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get Single Note by id

app.get("/note/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // if don't find any product in db
    if (!note) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${req.params.id}` });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update  Note by id

app.put("/note/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body);

    // if don't find any product in db
    if (!note) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${req.params.id}` });
    }

    const updatedNote = await Note.findById(req.params.id);

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Delete  Note by id

app.delete("/note/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    // if product does not exist in db
    if (!note) {
      return res
        .status(404)
        .json({ message: `cannot find any note with ID ${req.params.id}` });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//connect to db
const port = process.env.PORT || 3000;
mongoose
  .connect(
    "mongodb+srv://admin:5eS9aqHmJJtD18SI@cluster0.iajm9yq.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => console.log("listening to port 3000"));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
