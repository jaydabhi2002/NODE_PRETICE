const mongoose = require("mongoose")

const cartschema = new mongoose.Schema({
    uid:{
        type : mongoose.Schema.Types.ObjectId
    },
    pid:{
        type : mongoose.Schema.Types.ObjectId
    }
})
module.exports=new mongoose.model("cart",cartschema)