const router = require("express").Router()
const cart = require("../model/cart")
const auth = require("../middleware/auth")

router.post("/cart",auth,async(req,resp)=>{
    try {
      const user = req.user
      const  crt= new cart({uid:user._id,pid:req.body.pid})
      const data = await crt.save()
      resp.send(data)
    } catch (error) {
      console.log(error);
    }
  })
  // router.get("/cart",async(req,resp)=>{
  //   try {
  //     const data = await cart.find()
  //     resp.send(data)
  //   } catch (error) {
  //     resp.send(error)
  //   }
  // })
  router.get("/cart",auth,async(req,resp)=>{
    try {
      const user = req.user
      console.log(user);
      const data = await cart.aggregate([{$match:{uid:user._id}},{$lookup:{from:"users",localField:"uid",foreignField:"_id",as:"user"}},{$lookup:{from:"products",localField:"pid",foreignField:"_id",as:"product"}}])

      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })

router.delete("/cart/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await cart.findByIdAndDelete(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
module.exports=router