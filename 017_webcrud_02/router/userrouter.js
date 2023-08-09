const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcrypt")
const multer = require("multer")
const auth = require("../middleware/auth")
const { log } = require("console")

const storageEngine = multer.diskStorage({
    destination: "./public/img",
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
    },
  });

  const upload = multer({
    storage: storageEngine,
  });
  
// ------------------------------------reg---------------------------------------------------------
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
const data = await dt.save()
// console.log(data);
resp.render("reg",{msg:"ragistration successfully done"})
} catch (error) {
    console.log(error);
}
})


router.get("/views",auth,async(req,resp)=>{
    try {
        const userdata = await User.find()
        resp.render("view",{userdata:userdata})
    } catch (error) {
        console.log(error);
    }
})
router.get("/deleteuser",async(req,resp)=>{
    try {
        const id = req.query.uid
        await User.findByIdAndDelete(id)
        resp.redirect("views")
    } catch (error) {
        console.log(error);
    }
})

router.get("/edituser",async(req,resp)=>{
    try {
        const id = req.query.uid
        const user = await User.findOne({_id:id})
        // console.log(user);
        resp.render("update",{user:user})
    } catch (error) {
        console.log(error);
    }
})

router.post("/do_update",async(req,resp)=>{
    try {
        const id = req.body.id
        const pass = await bcrypt.hash(req.body.pass,10)
        await User.findByIdAndUpdate(id,{
            uname : req.body.uname,
            email : req.body.email,
            pass:pass
        })
        resp.redirect("views")
    } catch (error) {
        console.log(error);
    }

})

// -----------------------------------login-------------------------------------------------------
router.get("/",(req,resp)=>{
    resp.render("login")
})

router.post("/do_login",async(req,resp)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        // console.log(user);
        
        // console.log(user.Tokens.length);
        if(user.Tokens.length>=3)
        {
            resp.render("login",{err:"max user limit reached"})
            return;
        }
        const isModified = await bcrypt.compare(req.body.pass,user.pass)
        // console.log(isModified);
        if (isModified) {

         const token = await user.generateToken()
        //  console.log(token);
         resp.cookie("jwt",token)
         resp.redirect("views")
        } else {
            resp.render("login",{err:"invalid email pass"})
        }
    } catch (error) {
       
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
module.exports=router