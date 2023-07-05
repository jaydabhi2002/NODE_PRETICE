const yargs=require("yargs")
const file = require("./file")

const fs=require('fs')

yargs.command({
    command:"Add",
    builder:{
        name:{
            typr:String
        },
        email : {
            type : String
        },
        userid : {
            type : Number
        },
        password :{
            type : String
        }
},
    handler:function(argv){
        const data={
        name : argv.name,
        email : argv.email,
        userid : argv.userid,
        password : argv.password,
        }
    
        const jsondata=JSON.stringify(data)
             fs.writeFile("first.json",jsondata,(result)=>{
                console.log("File created success")

             })
    }
})
        fs.readFile("first.json","utf-8",(result,data)=>{
        const objdata =JSON.parse(data);
        console.log(data);
        console.log(objdata);
})

yargs.command({
    command : "view",
    handler : function(argv)
    {
       file.viewFile()
    }
})

yargs.command({
    command : "remove",
    builder : {
        name : {
            type : String
        }
    },
    handler : function(argv){
        file.removeData(argv.name)
    }
})


yargs.argv;