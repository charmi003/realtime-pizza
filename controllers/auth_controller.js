const User=require("../models/user");
const Cart=require("../models/cart");

//Action to display the register page
module.exports.registerPage=function(req,res)
{
    return res.render("register");
}


//Action for receiving the register form data
module.exports.register=async function(req,res)
{
    try
    {
        let user=await User.findOne({Email:req.body.Email});
        if(user)
        {
            req.flash("error","Email already exists!");
            return res.redirect("back");
        }
        else
        {
            let new_user=new User(req.body);
            let new_user_created=await new_user.save();
            
            //creating a cart for the user
            let new_cart=new Cart({
                User:new_user_created._id,
                Items:[],
                TotalPrice:0,
                TotalQuantity:0
            })

            let new_cart_created=await new_cart.save();

            await User.findByIdAndUpdate(new_user_created._id,{
                Cart:new_cart_created
            })

            return res.redirect("/auth/login-page");
        }
    }catch(err)
    {
        console.log(err);
        req.flash("error","Error!");
        return res.redirect("back");
    }
}



//Action to display the login page
module.exports.loginPage=function(req,res)
{
    return res.render("login");
}


//Action for logging the user in
module.exports.login=async function(req,res)
{
    req.flash("success","Logged In Successfully!");
    return res.redirect("/");
}


//Action for logging the user out
module.exports.logout=function(req,res)
{
    req.logout();
    req.flash("success","Logged Out Successfully!");
    return res.redirect("/");
}

