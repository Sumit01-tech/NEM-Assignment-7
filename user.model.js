const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    profileName: {
        type: String,
        required: true,
        enum: ["fb", "twitter", "github", "instagram"],
    },
    url: {
        type: String,
        required: true,
        match: /^https?:\/\/.+$/,
    },
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profiles: [profileSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
