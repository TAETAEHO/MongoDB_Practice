const MongoDb = require("mongodb");
const { config } = require("../config.js");

module.exports = async () => {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => client.db());
};
