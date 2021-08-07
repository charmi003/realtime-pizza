const Pizza=require("../models/pizza");

//Action to display the home page
module.exports.home=async function(req,res)
{
    try
    {
        let all_pizzas=await Pizza.find({});
        return res.render("home",{
            all_pizzas:all_pizzas
        })
    }
    catch(err)
    {
        return res.redirect("back");
    }
}


