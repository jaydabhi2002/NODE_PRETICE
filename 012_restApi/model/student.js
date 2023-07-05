const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const studentschema = new mongoose.Schema({

    name : {
        type : String
    },
    
    email:{
        type: String
    },
    pass:{
        type:String
    },
    date:{
        type:Date,
        default : Date.now()
    }
    })
    

studentschema.pre("save", async function(){
    try {
        this.pass = await bcrypt.hash(this.pass,10)
    } catch (error) {
        console.log(error);
    }})

module.exports = new mongoose.model("student",studentschema)