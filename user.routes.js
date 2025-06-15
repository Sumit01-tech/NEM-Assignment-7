const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/add-user", userController.addUser);

router.post("/add-profile/:userId", userController.addProfile);

router.get("/get-users", userController.getUsers);

module.exports = router;
