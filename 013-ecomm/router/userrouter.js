const router = require("express").Router()  
const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/user",async(req,resp)=>{
  try {

    const  data= new User(req.body)
    const insert = await data.save()
    resp.send(insert)
  } catch (error) {
    console.log(error);
  }
})
router.get("/user",async(req,resp)=>{
  try {
    const data = await User.find()
    resp.send(data)
  } catch (error) {
    resp.send(error)
  }
})
router.put("/user/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await User.findByIdAndUpdate(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })

  router.delete("/user/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await User.findByIdAndDelete(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
  router.get("/user/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await User.findOne({_id:_id})
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })

  router.post("/user/login",async(req,resp)=>{
    try {
      const user = await User.findOne({email:req.body.email})
      const isMatch = await bcrypt.compare(req.body.pass,user.pass)
      
      if(isMatch)
      {
        const token = await jwt.sign({_id:user._id},process.env.S_KEY)
        resp.send("auth-token :"+token)
      }
      else{
        resp.send("invalid credentials")
      }
    } catch (error) {
      console.log(error);
      resp.send("invalid credentials")
    }
  })
module.exports=router