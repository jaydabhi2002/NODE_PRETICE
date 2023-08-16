const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const multer = require("multer")
const fs = require("fs")


const storageEngine = multer.diskStorage({
    destination: "./public/img",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });
   
  const upload = multer({
    storage: storageEngine,
  });
  
// ---------------------------------------ragistretion page-----------------------------------------------

router.get("/reg",(req,resp)=>{
    resp.render("reg")
})
router.post("/do_ragister",upload.single("file"),async(req,resp)=>{
try {
    const dt = new User({
        uname : req.body.uname,
        email:req.body.email,
        pass : req.body.pass,
        img : req.file.filename
    })
    const udata = await dt.save()
    resp.render("reg",{msg:"registration sucessfully done!!!"})
} catch (error) {
    console.log(error);
}
})

router.get("/viewuser",auth,async(req,resp)=>{
    try {
        const data = await User.find();
        resp.render("view",{userdata:data})
    } catch (error) {
        console.log(error);
    }
})

router.get("/deleteuser",async(req,resp)=>{
    try {
        const id = req.query.uid
        const udata = await User.findByIdAndDelete(id)
        fs.unlinkSync("public/img/"+udata.img)
        resp.redirect("viewuser")
    } catch (error) {
        console.log(error);
    }
})


router.get("/edituser",async(req,resp)=>{
    try {
        const id = req.query.uid
        const data = await User.findOne({_id:id})
        resp.render("update",{data:data})
    } catch (error) {
        console.log(error);
    }
})

router.post("/do_update",upload.single("file"),async(req,resp)=>{
    try {
        const id = req.body.id
        const udata = await User.findByIdAndUpdate(id,{
            uname : req.body.uname,
            email:req.body.email,
            pass : req.body.pass,
            img : req.file.filename
        })
        fs.unlinkSync("public/img/"+udata.img)
        resp.redirect("viewuser")
    } catch (error) {
        console.log(error);
    }
})

// --------------------------------------login page------------------------------------------------------
router.get("/",(req,resp)=>{
    resp.render("login")
})
router.post("/do_login",async(req,resp)=>{
    try {
        const user = await User.findOne({email:req.body.email})
       if(user.Tokens.length>=2)
       {
        resp.render("login",{err:"Max user limit reached"})
        return;
       }
        const isValid = await bcrypt.compare(req.body.pass,user.pass)
        if(isValid)
        {
            const token =  await user.generateToken()
            
            resp.cookie("jwt",token)
            resp.redirect("viewuser")
        }
        else{
            resp.render("login",{err:"Invalid credentials !!!"})
        }
    } catch (error) {
        resp.render("login",{err:"Invalid credentials !!!"})
    }
})

router.get("/logout",auth,async(req,resp)=>{

    try {
        const user = req.user
        const token = req.token 
    
        user.Tokens = user.Tokens.filter(ele=>{
        return ele.token!=token
        })
        user.save()
        resp.clearCookie("jwt")
        resp.render("login")

    } catch (error) {
        console.log(error);
    }
})

router.get("/logoutall",auth,async(req,resp)=>{
    try {
        const user = req.user
        const token = req.token 

        user.Tokens = []
        user.save()
        resp.clearCookie("jwt")
        resp.render("login")

    } catch (error) {
        console.log(error);
    }
})
// ---------------------------------------changepassword-----------------------------------------------
router.get("/changepass",auth,async(req,resp)=>{
    const id = req.query.uid
    // console.log(id);
    const data = await User.findOne({_id:id})
    resp.render("changepassword",{data:data})
})

router.post("/new_password",auth,async(req,resp)=>{
    try {
        const user = req.user
        const id = req.body.id
        
        const isValid = await bcrypt.compare(req.body.pass,user.pass)
        if (isValid) {
            const npass = await bcrypt.hash(req.body.npass,10)
            await User.findByIdAndUpdate(id,{pass:npass})
            resp.redirect("viewuser")
        } else {
            resp.send("please enter valid pass.... ")
        }
    } catch (error) {
        console.log(error);
    }
    })
module.exports=router