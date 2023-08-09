const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const path = require("path")
require("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})
app.use(bodyParser.urlencoded({ extended: false }))
const viewpath = path.join(__dirname,"../templetes/views")
const partialspath = path.join(__dirname,"../templetes/partials")
const publicpath = path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(publicpath))

app.use("/",require("../router/userrouter"))

app.listen(PORT,()=>{
    console.log("server running on port" +PORT);
})