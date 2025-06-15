const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/LibraryDB");
        console.log("Connected to MongoDB LibraryDB");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};

module.exports = connectDB;
