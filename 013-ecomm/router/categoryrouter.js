const router = require("express").Router()  
const category = require("../model/categories")

router.post("/category",async(req,resp)=>{
  try {

    const  data = new category(req.body)
    const insert = await data.save()
    resp.send(insert)
  } catch (error) {
    console.log(error);
  }
})
router.get("/category",async(req,resp)=>{
  try {
    const data = await category.find()
    resp.send(data)
  } catch (error) {
    resp.send(error)
  }
})
router.put("/category/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await category.findByIdAndUpdate(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
  router.delete("/category/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await category.findByIdAndDelete(_id,req.body) 
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
  router.get("/category/:id",async(req,resp)=>{
    try {
      const _id = req.params.id
      const data = await category.findOne({_id:_id})
      resp.send(data)
    } catch (error) {
      resp.send(error)
    }
  })
module.exports=router