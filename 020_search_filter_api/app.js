const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 5000;
// const DB_URL = process.env.DB_URL
const prod_route = require("./routes/products");
app.get("/", (req, resp) => {
  resp.send("hi I am live");
});

// middleware or to set router
app.use("/api/prod", prod_route);
const start = async (req, resp) => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes I Am Connected`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
