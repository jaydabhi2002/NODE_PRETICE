const connectDB = require("./db/connect");
const product = require("./model/product");
require("dotenv").config();
const productjson = require("./product.json");

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    await product.deleteMany();
    await product.create(productjson);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
start();
