const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  uname: {
    type: String,
  },
  email: {
    type: String,
  },
  pass: {
    type: String,
  },
  TOKENS: [
    {
      token: {
        type: String,
      },
    },
  ],
});
UserSchema.pre("save", async function () {
  try {
    if(this.isModified("pass"))
    {
    this.pass = await bcrypt.hash(this.pass, 10);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = new mongoose.model("User", UserSchema);
