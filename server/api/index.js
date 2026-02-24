const app = require("../src/app");
const connectDb = require("../src/db");

let isDbConnected = false;

module.exports = async (req, res) => {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }

  return app(req, res);
};
