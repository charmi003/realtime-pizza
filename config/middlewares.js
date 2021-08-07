module.exports.setFlash=function(req,res,next)
{
    res.locals.flash={
        "success":req.flash("success"),
        "error":req.flash("error"),
        "sweetAlert":req.flash("sweetAlert")
    }
    return next();
}

module.exports.qty=async function(req,res,next)
{
    if(req.user)
        await req.user.populate("Cart").execPopulate();
    return next();
}