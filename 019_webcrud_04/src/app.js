const express = require("express")
const app = express()
const hbs = require("hbs")
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
const bodyparser = require("body-parser")

mongoose.connect(DB_URL).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
})

app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false }))
const viewpath = path.join(__dirname,"../templetes/views")
const partialspath = path.join(__dirname,"../templetes/partials")
const publicpath = path.join(__dirname,"../public")

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(publicpath))

app.use("/",require("../router/userrouter"))

 app.listen(PORT,()=>{
    console.log("server running in port" +PORT);
 })
