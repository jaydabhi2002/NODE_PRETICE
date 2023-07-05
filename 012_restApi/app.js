const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = 3000
const dburl = "mongodb://127.0.0.1:27017/restapi"

mongoose.connect(dburl).then(()=>{
    console.log("db connencted");
}).catch(err=>{
    console.log(err);
})

app.use(express.json())
app.use("/",require("./router/studentrouter"))

app.listen(PORT,()=>{
    console.log("server conneted");
})