const Order=require("../models/order");
const Cart=require("../models/cart");


//Action to display all the orders for the admin 
module.exports.allOrders=async function(req,res)
{
    try
    {
        let orders=await Order.find({ Status:{$ne:'delivered'} }).sort({createdAt:-1})
        .populate('User','Name Email')
        .populate({
            path:"Items",
            populate:{
                path:"Pizza"
            }
        })
        return res.render("admin-all-orders.ejs",{
            orders:orders
        });
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");
    }
    
}


//Action to change the order-status
module.exports.updateOrderStatus=async function(req,res)
{
    await Order.findByIdAndUpdate(req.query.orderId,{
        Status:req.query.newStatus
    })

    let order=await Order.findById(req.query.orderId);

    let date=order.updatedAt; 
    
    function n(n){
        return n > 9 ? "" + n: "0" + n;
    }
    let hrs=n(date.getHours());
    let mins=n(date.getMinutes());
    let time=hrs+":"+mins;

    
    const eventEmitter=req.app.get("eventEmitter");
    eventEmitter.emit("orderStatusUpdated",{
        orderId:req.query.orderId,
        newStatus:req.query.newStatus,
        time:time

    })
    return res.json({
        message:"Order Status Updated!"
    })

}

 
