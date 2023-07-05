const router = require("express").Router()  
const mongoose = require("mongoose")
const category = require("../model/categories")
const product = require("../model/product")

router.post("/product",async(req,resp)=>{
  try {

    const  prod = new product(req.body)
    const data = await prod.save()
    resp.send(data)
  } catch (error) {
    console.log(error);
  }
})
router.get("/product",async(req,resp)=>{
  try {
    const data = await product.aggregate([{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"category"}}])

    resp.send(data)
  } catch (error) {
    resp.send(error)
  }
})
router.get("/product/:id",async(req,resp)=>{
  try {
    const _id= new mongoose.Types.ObjectId(req.params.id)
    const data = await product.aggregate([{$match:{_id:_id}},{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"category"}}])
    resp.send(data)
  } catch (error) {
    resp.send(error)
  }
})

router.put("/product/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await product.findByIdAndUpdate(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
  router.delete("/product/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await product.findByIdAndDelete(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })

  router.get("/product/category/:id",async(req,resp)=>{
    try {
      const _id = new mongoose.Types.ObjectId(req.params.id)
      console.log(_id);
      const data = await product.aggregate([{$match:{catid:_id}},{$lookup:{from:"categories",localField:"catid",foreignField:"_id",as:"category"}}])

      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
module.exports=router