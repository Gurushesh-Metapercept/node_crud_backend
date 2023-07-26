const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },
  note: {
    type: String,
  },
});

const Note = mongoose.model("Note", productSchema);
module.exports = Note;
