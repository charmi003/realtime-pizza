const Cart=require("../models/cart");
const Pizza=require("../models/pizza");
const User=require("../models/user");

//Action to display the cart
module.exports.display=async function(req,res)
{
    try
    {
        await req.user.populate({
            path:"Cart",
            populate:{
                path:"Items",
                populate:{
                    path:"Pizza"
                }
            }
        }).execPopulate();
    
        return res.render("cart");
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");

    }
   
}


//Action to add pizza to the cart
module.exports.add=async function(req,res)
{
    try{
        
        if(!req.user)
        {
            req.flash("error","Login To Order!")
            return res.redirect("back");
        }
        let id=req.params.id;
        let cart=await Cart.findById(req.user.Cart);
        let pizza=await Pizza.findById(id);

        let idx=cart.Items.findIndex( (obj)=> obj.Pizza.equals(pizza._id) );

        if(idx==-1)   //No previous orders on this pizza
        {
            let new_item={
                Pizza:id,
                Quantity:1
            }
            cart.Items.push(new_item);
            cart.TotalQuantity+=1;
            cart.TotalPrice+=pizza.Price;
            await cart.save();
        }
        else    //order already exists on this pizza, just need to update the qnty
        {
            cart.Items[idx].Quantity+=1;
            cart.TotalQuantity+=1;
            cart.TotalPrice+=pizza.Price;
            await cart.save();
        }

        if(req.xhr)
        {
            let loggedIn=true;
            if(!req.user)
                loggedIn=false;
            return res.status(200).json({
                message:"Item Added To The Cart!",
                loggedIn:loggedIn
            })
        }

        req.flash("success","Item Added To The Cart!");
        return res.redirect("back");
    }
    catch(err){
        req.flash("error","Error!");
        return res.redirect("back");
    }

}

//Action to increase the qty by 1
module.exports.increase=async function(req,res)
{
    try
    {
        let id=req.query.id;
        let cart=await Cart.findById(req.user.Cart);

        await cart.populate({
            path:"Items",
            populate:{
                path:"Pizza"
            }
        }).execPopulate();

        let index=cart.Items.findIndex( (item)=> item.Pizza._id==id );

        cart.Items[index].Quantity+=1;
        cart.TotalQuantity+=1;
        cart.TotalPrice+=cart.Items[index].Pizza.Price;

        await cart.save();
    
        return res.json({
            message:"Quantity increased by one",
            cart:cart,
            pizza:cart.Items[index].Pizza,
            index:index
        })
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");
    }
    
}



//Action to decrease the qty by 1
module.exports.decrease=async function(req,res)
{
    try
    {
        let id=req.query.id;
        let cart=await Cart.findById(req.user.Cart);

        await cart.populate({
            path:"Items",
            populate:{
                path:"Pizza"
            }
        }).execPopulate();

        let index=cart.Items.findIndex( (item)=> item.Pizza._id==id );

        cart.Items[index].Quantity-=1;
        cart.TotalQuantity-=1;
        cart.TotalPrice-=cart.Items[index].Pizza.Price;

        await cart.save();
    
        return res.json({
            message:"Quantity decreased by one",
            cart:cart,
            pizza:cart.Items[index].Pizza,
            index:index
        })
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");
    }
    
}


//Action to remove the item from the cart
module.exports.remove=async function(req,res)
{
    try
    {
        let id=req.query.id;
        let cart=await Cart.findById(req.user.Cart);

        await cart.populate({
            path:"Items",
            populate:{
                path:"Pizza"
            }
        }).execPopulate();

        let index=cart.Items.findIndex( (item)=> item.Pizza._id==id );

        cart.TotalQuantity-=cart.Items[index].Quantity;
        cart.TotalPrice-=cart.Items[index].Quantity*cart.Items[index].Pizza.Price;
        cart.Items.splice(index,1);

        await cart.save();
        
    
        return res.json({
            message:"Item removed",
            cart:cart
        })
    }
    catch(err)
    {
        req.flash("error","Error!");
        return res.redirect("back");
    }
    
}