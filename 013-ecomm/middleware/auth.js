const jwt = require("jsonwebtoken")
const User = require("../model/user")
const auth = async(req,resp,next)=>{
const token = req.header("auth-token")
    try {
    const data = await jwt.verify(token,process.env.S_KEY)
    if(data)
    {
     const user = await User.findOne({_id:data._id})
     req.user = user;
     next()
    }else{
        resp.send("invalid token")
    }
    }catch (error) {
        resp.send("invalid token")
   }
}
module.exports=auth