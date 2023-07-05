const router = require("express").Router()
const student = require("../model/student")
const bcrypt = require("bcryptjs")
router.get("/student",async(req,resp)=>{
    try {
        const data = await student.find()
        resp.send(data);
    } catch (error) {
       resp.send(error);
    }
})
router.post("/student",async(req,resp)=>{
    try {
    const data = new student(req.body)
    const check =  await data.save()
    resp.send(check);
    } catch (error) {
        console.log(err);
    }
})
router.put("/student/:id",async(req,resp)=>{
    const _id =  req.params.id
    try {
        const data = await student.findByIdAndUpdate(_id,req.body)
        console.log(data);
    } catch (error) {
        console.log(error);
    }
})
router.delete("/student/:id",async(req,resp)=>{
    const _id = req.params.id

    try {
        const data = await student.findByIdAndDelete(_id)
        console.log(data);
    } catch (error) {
    console.log(error);
    }
})
router.post("/login",async(req,resp)=>{
    try {
        
    const user = await student.findOne({email:req.body.email})
    console.log(user);
    const isMatch = await bcrypt.compare(req.body.pass,user.pass)
    
       if(isMatch)
       {
         resp.send("welcome : "+user.name)
       }
       else
       {
        resp.send("invalid credentials !!")
       }




    } catch (error) {
        console.log(error);
        resp.send("invalid credentials !!")
    }
})


module.exports = router