require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

const controllers = require("./controllers");
const database = require("./database/database");

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  })
);

app.use(cookieParser());

app.post("/board", controllers.createBoard);
app.get("/board", controllers.findBoard);
app.delete("/board", controllers.deleteBoard);
app.put("/board", controllers.updateBoard);

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

let server;

database()
  .then(() => {
    console.log("init!");
    server = app.listen(HTTPS_PORT, () =>
      console.log(`http server running on port ${HTTPS_PORT}`)
    );
  })
  .catch(console.error);

module.exports = server;
