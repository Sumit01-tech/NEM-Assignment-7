const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: [String],
    publicationYear: Number,
});

const librarySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    books: [bookSchema],
});

const Library = mongoose.model("Library", librarySchema);
module.exports = Library;
