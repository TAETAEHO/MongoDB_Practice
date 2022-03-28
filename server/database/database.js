// const MongoDb = require("mongodb");
const Mongoose = require("mongoose");
const { config } = require("../config.js");

let db;
module.exports = async () => {
  // return MongoDb.MongoClient.connect(config.db.host) //
  //   .then((client) => {
  //     db = client.db;
  //   });

  return Mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
