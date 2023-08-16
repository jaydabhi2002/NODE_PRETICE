const express = require("express")
const app = express()
const mongoose = require("mongoose")
const hbs = require("hbs")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require("path")
require("dotenv").config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
app.use(cookieParser())
mongoose.connect(DB_URL).then(()=>{
    console.log("db connected");
}).catch(err=>{
    console.log(err);
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
    console.log("server running on port :"+PORT);
})