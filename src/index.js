const express = require("express");
const db = require("./models/db.mongo.js");
const swaggerUi = require('swagger-ui-express');

const usersRouter = require("./routes/users.router.js");
const tokensRouter = require("./routes/tokens.router.js");
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);
app.use("/api/tokens", tokensRouter);

// app.use(function(request, response, next) {response.status(404).send("Not Found")});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

db.connect();
app.listen(3000, () => console.log("Сервер ожидает подключения...")); 