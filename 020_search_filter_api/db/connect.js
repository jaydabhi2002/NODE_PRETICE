const mongoose = require("mongoose");
const connectDB = (uri) => {
  console.log("connect DB");
  return mongoose.connect(uri, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
