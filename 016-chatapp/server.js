const express = require("express")
const app = express()
const http = require ("http").createServer(app)


app.get("/",(req,resp)=>{
    console.log();
})


http.listen(9000,()=>{
    console.log("server running on port :"+9000);
})