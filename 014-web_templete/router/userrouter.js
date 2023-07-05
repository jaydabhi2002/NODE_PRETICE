const router = require("express").Router()
const User = require("../model/user")
const bcrypt = require("bcryptjs")
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

router.get("/",(req,resp)=>{
    resp.render("login")
})
router.get("/reg",(req,resp)=>{
    resp.render("reg")
})
router.post("/do_register",upload.single("file"),async(req,resp)=>{
    try {
        const dt = new User({uname:req.body.uname, email:req.body.email, pass:req.body .pass,img: req.file.filename})
        const udata = await dt.save()
        console.log(udata);
        resp.render("reg",{msg : "ragistration successfully done"})
    }catch (error) {
        console.log(error);
    }
})
router.get("/view",auth,async(req,resp)=>{
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
       resp.redirect("view")
    } catch (error) {
    console.log(error);
    }
    })
router.get("/edituser",async(req,resp)=>{
    try {
        const id = req.query.uid
        const dt = await User.findOne({_id:id})
        resp.render("update",{data : dt})
    } catch (error) {
    console.log(error);
    }
    })
router.post("/do_update",upload.single("file"),async(req,resp)=>{
    try {
        const id = req.body.id
        const udata = await User.findByIdAndUpdate(id,{uname:req.body.uname, email:req.body.email, pass:req.body .pass,img: req.file.filename})
        fs.unlinkSync("public/img/"+udata.img)
        resp.redirect("view")
    } catch (error) {
    console.log(error);
     }
     })
router.post("/do_login",async(req,resp)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        // console.log(user.Tokens.length);
        if(user.Tokens.length>=5){
            resp.render("login",{err : "maximum user limit reached"})
            return;
        }
        const isValid = await bcrypt.compare(req.body.pass,user.pass)
               
    if(isValid)
    {
    const token = await user.generateToken()
    console.log(token);
    resp.cookie("jwt",token)
    resp.redirect("view")
    }
    else
    {
    resp.render("login",{err : "invalid email pass"})
    }
    }catch(error){
    resp.render("login",{err : "invalid email pass"})
    }
    })
    router.get("/logout",auth,async(req,resp)=>{
    try {
        const user = req.user
        const token = req.token
        // console.log(user);
       user.Tokens = user.Tokens.filter(ele=>{
           return ele.token!=token
        })
        user.save()
        resp.clearCookie("jwt")
        resp.render("login")
    } catch (error) {
            
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
                
        }
        })    
    
module.exports=router