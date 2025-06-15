const express = require("express");
const router = express.Router();
const controller = require("../controllers/library.controller");

// ✅ This line is likely causing the crash — double-check the export
router.post("/add-library", controller.addLibrary);

router.get("/get-all-books", controller.getAllBooks);
router.put("/add-genre/:libraryId/:bookTitle", controller.addGenreToBook);
router.get("/get-libraries-by-genres", controller.getLibrariesByGenres);
router.get("/get-books-by-criteria", controller.getBooksByCriteria);
router.delete("/remove-book/:libraryId/:bookTitle", controller.removeBook);

module.exports = router;
