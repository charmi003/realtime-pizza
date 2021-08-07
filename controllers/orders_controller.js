const Order=require("../models/order");
const Cart=require("../models/cart");


//Action to place an order
module.exports.placeOrder=async function(req,res)
{
    try
    {
        let cart=await Cart.findById(req.user.Cart);

        let new_order=new Order({
            User:req.user._id,
            Items:cart.Items,
            TotalPrice:cart.TotalPrice,
            Phone:req.body.Phone,
            Address:req.body.Address,
        });

        let new_order_created=await new_order.save();

        req.user.Orders.push(new_order_created._id);
        await req.user.save();


        return res.redirect(`/payment/page/?totalAmt=${cart.TotalPrice}&orderId=${new_order_created._id}`);
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");
    }
    
}



//Action to display all the orders of the customer
module.exports.customerAllOrders=async function(req,res)
{
    await req.user.populate({
        path:"Orders"
    }).execPopulate();
    
    
    return res.render("customer-all-orders.ejs");

}



//Action to render the order track page
module.exports.trackPage=async function(req,res)
{
    let order=await Order.findById(req.params.id);

    let date=order.updatedAt; 
    
    function n(n){
        return n > 9 ? "" + n: "0" + n;
    }
    let hrs=n(date.getHours());
    let mins=n(date.getMinutes());
    let time=hrs+":"+mins;

    await order.populate({
        path:"Items",
        populate:{
            path:"Pizza"
        }
    }).execPopulate();

    return res.render("order-track",{
        id:req.params.id,
        time:time,
        order:order
    });
}

