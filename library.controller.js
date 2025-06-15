const Library = require("../models/library.model");

exports.addLibrary = async (req, res, next) => {
    try {
        const { name, books } = req.body;

        if (!name || !Array.isArray(books)) {
            return res.status(400).json({ message: "Library name and books are required" });
        }

        const newLibrary = new Library({ name, books });
        await newLibrary.save();

        res.status(201).json({ message: "Library created successfully", library: newLibrary });
    } catch (err) {
        next(err);
    }
};

exports.getAllBooks = async (req, res, next) => {
    try {
        const libraries = await Library.find();
        const allBooks = libraries.flatMap(lib =>
            lib.books.map(book => ({
                title: book.title,
                author: book.author,
                genre: book.genre,
                libraryName: lib.name
            }))
        );
        res.json(allBooks);
    } catch (err) {
        next(err);
    }
};

exports.addGenreToBook = async (req, res, next) => {
    const { libraryId, bookTitle } = req.params;
    const { newGenre } = req.body;

    try {
        const library = await Library.findById(libraryId);
        if (!library) return res.status(404).json({ message: "Library not found" });

        const book = library.books.find(book => book.title === bookTitle);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (!book.genre.includes(newGenre)) {
            book.genre.push(newGenre);
            await library.save();
        }

        res.json({ message: "Genre added successfully", book });
    } catch (err) {
        next(err);
    }
};

exports.getLibrariesByGenres = async (req, res, next) => {
    const genres = req.query.genres?.split(",") || [];

    try {
        const libraries = await Library.find({
            books: { $elemMatch: { genre: { $in: genres } } }
        });

        res.json(libraries);
    } catch (err) {
        next(err);
    }
};

exports.getBooksByCriteria = async (req, res, next) => {
    const { author, minPublicationYear, genres } = req.query;
    const genreArr = genres?.split(",") || [];

    try {
        const libraries = await Library.find();
        const books = libraries.flatMap(lib =>
            lib.books
                .filter(book =>
                    (!author || book.author === author) &&
                    (!minPublicationYear || book.publicationYear >= Number(minPublicationYear)) &&
                    (!genres || genreArr.some(g => book.genre.includes(g)))
                )
                .map(book => ({
                    ...book.toObject(),
                    libraryName: lib.name
                }))
        );

        res.json(books);
    } catch (err) {
        next(err);
    }
};

exports.removeBook = async (req, res, next) => {
    const { libraryId, bookTitle } = req.params;

    try {
        const library = await Library.findById(libraryId);
        if (!library) return res.status(404).json({ message: "Library not found" });

        const originalLength = library.books.length;
        library.books = library.books.filter(book => book.title !== bookTitle);

        if (originalLength === library.books.length) {
            return res.status(404).json({ message: "Book not found in library" });
        }

        await library.save();
        res.json({ message: "Book removed successfully" });
    } catch (err) {
        next(err);
    }
};
