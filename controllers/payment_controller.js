const Order=require("../models/order");
const Cart=require("../models/cart");
const mailer=require("../mailers/mailer");
const env=require("../config/environment");

module.exports.display=function(req,res)
{
    return res.render("payment",{
        totalAmt:req.query.totalAmt,
        orderId:req.query.orderId
    });
}




const Razorpay=require("razorpay");
const razorpay=new Razorpay({
    key_id:env.rzp_keyId,
    key_secret:env.rzp_keySecret
})

module.exports.payment=async function(req,res)
{
    try
    {
        let order=await Order.findByIdAndUpdate(req.query.orderId,{
            PaymentType:"prepaid"
        });

        var options = {
        amount: req.query.total*100,  // amount in the smallest currency unit
        currency: "INR",
        };


        razorpay.orders.create(options,(err,order)=>{
            res.json({
                order:order,
                keyId:env.rzp_keyId
            });
        })

    }
    catch(err)
    {
        req.flash("error","ERROR!");
        return res.redirect("back");
    }
   
}





module.exports.complete=async function(req,res)
{
    try
    {
        // console.log(req.body);
        let cart=await Cart.findById(req.user.Cart);
        cart.Items.splice(0,cart.Items.length);
        cart.TotalPrice=0;
        cart.TotalQuantity=0;
        await cart.save();


        // when a customer places an order, the admin all orders page should get this order in realtime..therefore emitting the event 
        let orderId=req.query.orderId;
        let newOrder=await Order.findById(orderId).populate('User','Name Email')
        .populate({
            path:"Items",
            populate:{
                path:"Pizza"
            }
        })

        function n(n){
            return n > 9 ? "" + n: "0" + n;
        }
        
        let date=newOrder.createdAt; 
        let hrs=n(date.getHours());
        let mins=n(date.getMinutes());
        let time=hrs+":"+mins;
    
        let eventEmitter=req.app.get("eventEmitter");
        eventEmitter.emit('newOrder',{
            newOrder:newOrder,
            time:time

        })

        mailer.orderPlaced(newOrder);

        req.flash("sweetAlert","Order Placed Successfully!");
        return res.redirect("/orders/customer-all-orders");
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");
    }
    
}