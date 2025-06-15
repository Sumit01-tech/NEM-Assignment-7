const express = require("express");
const connectDB = require("./config/db");
const libraryRoutes = require("./routes/library.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

connectDB();
app.use("/api", libraryRoutes);
app.use(errorHandler);

app.listen(3001, () => {
    console.log("Server Started");
});
