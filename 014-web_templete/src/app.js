const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const path = require("path")
const cookieParser = require("cookie-parser")
require ("dotenv").config()
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const bodyParser = require('body-parser')
app.use(cookieParser())

mongoose.connect(DB_URL).then(()=>{
    console.log("db connected");
})
app.use(bodyParser.urlencoded({ extended: false }))
const viewpath = path.join(__dirname,"../templetes/view")
const publicpath = path.join(__dirname,"../public")
const partialspath = path.join(__dirname,"../templetes/partials")

app.set("view engine","hbs")
app.set("views",viewpath)
hbs.registerPartials(partialspath)
app.use(express.static(publicpath))

app.use("/",require("../router/userrouter"))

app.listen(PORT,()=>{
    console.log("server running" +PORT);
})