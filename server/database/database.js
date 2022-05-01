const Mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
  return Mongoose.connect(process.env.DATABASE_HOST);
};
