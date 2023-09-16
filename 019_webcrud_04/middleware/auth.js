const jwt = require("jsonwebtoken");
const User = require("../model/user");
const auth = async (req, resp, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  try {
    const data = await jwt.verify(token, process.env.S_KEY);
    if (data) {
      const user = await User.findOne({ _id: data._id });
      req.user = user;
      req.token = token;
      next();
    } else {
      resp.render("login", { err: "please login first...." });
    }
  } catch (error) {
    resp.render("login", { err: "please login first...." });
  }
};
module.exports = auth;