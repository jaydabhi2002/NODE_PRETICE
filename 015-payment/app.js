const express = require("express")
const app = express()
const Razorpay = require("razorpay")
const cors = require('cors')
app.use(cors())
app.get("/payment",(req,resp)=>{

    const amt = req.query.amt
    var instance = new Razorpay({
        key_id: 'rzp_test_KKlu164SWMUaIG',
        key_secret: 'mzojOTQAhXQQ7NX2o0SbhzGr',
      });

    
var options = {
    amount: Number(amt)*100,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function(err, order) {
    // console.log(order);
    resp.send(order)
  });
})

app.listen(9000)