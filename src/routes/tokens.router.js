const express = require("express");
const tokens = require("../controllers/tokens.controller.js");
const tokensRouter = express.Router();

tokensRouter.get("/", tokens.getTokens);
tokensRouter.get("/:user_id", tokens.getTokens);
tokensRouter.post("/", tokens.addToken);
tokensRouter.put("/", tokens.updateToken);
tokensRouter.delete("/:id", tokens.deleteToken);

module.exports = tokensRouter;