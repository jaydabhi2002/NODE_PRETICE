const mongoose = require("mongoose")
const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const dburl = process.env.DB_URL
app.use(express.json())
mongoose.connect(dburl).then(()=>{
    console.log("DB connected");
}).catch(error=>{
    console.log(error);
})

app.use("/",require("../router/userrouter"))
app.use("/",require("../router/categoryrouter"))
app.use("/",require("../router/productrouter"))
app.use("/",require("../router/cartrouter"))

app.listen(PORT,()=>{
    console.log("server connect" +PORT);
})