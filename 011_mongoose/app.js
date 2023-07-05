const mongoose = require("mongoose")

dburl = "mongodb://127.0.0.1:27017/shop"
mongoose.connect(dburl).then(()=>{
    console.log("db connencted");
}).catch(err=>{
    console.log(err);
})

const prodschema = new mongoose.Schema({

name : {
    type : String
},

price:{
    type: Number
},
qty:{
    type:Number
}
})

const product = new mongoose.model("product",prodschema)

const adddata = ()=>{
    const pro = new product({name:"book",price:"100",qty:"5"})
    pro.save().then(result=>{
        console.log(result);
    }).catch(err=>{
        console.log(err);
    })

}
const addmanydata = () => {
const A1 = new product({name:"pen",price:"10",qty:"5"})
const A2 = new product({name:"kborad",price:"1000",qty:"5"})
const A3 = new product({name:"speaker",price:"800",qty:"5"})

product.insertMany([A1, A2, A3]).then(result =>{
    console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

const viewdata = () => {
product.find().then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
}

const updatedata = () => {
    product.updateOne({name:"pen"},{price:20}).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

const deleteOne = () => {
    product.deleteOne({name:"pen"}).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}
const deleteMany = () => {
    product.deleteMany({name:"book"}).then(result => {
        console.log(result);
    }).catch(err => {
        console.log(err);
    })
}

// adddata();
// addmanydata();
// viewdata();
// updatedata();
// deleteOne();
deleteMany();