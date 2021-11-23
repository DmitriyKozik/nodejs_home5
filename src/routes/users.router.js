const express = require("express");
const users = require("../controllers/users.controller.js");
const usersRouter = express.Router();

usersRouter.get("/", users.getUsers);
usersRouter.post("/", users.addUser);
usersRouter.put("/", users.updateUser);
usersRouter.delete("/:id", users.deleteUser);

module.exports = usersRouter;