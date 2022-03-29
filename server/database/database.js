// const MongoDb = require("mongodb");
const Mongoose = require("mongoose");
require("dotenv").config();
const { config } = require("../config.js");

module.exports = async () => {
  // return MongoDb.MongoClient.connect(config.db.host) //
  //   .then((client) => {
  //     db = client.db;
  //   });

  return Mongoose.connect(process.env.DATABASE_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
