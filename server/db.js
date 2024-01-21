const mongoose = require("mongoose");
require("dotenv").config();
const mongoURL = process.env.mongoURL;

mongoose.set("strictQuery", false);

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL).then(() => {
      console.log("Database Connected Successfully");
    });
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

module.exports = connectToMongo;
