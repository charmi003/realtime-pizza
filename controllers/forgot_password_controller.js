const User=require("../models/user");
const ResetPasswordToken=require("../models/ResetPasswordToken");
const crypto=require("crypto");
const ResetPasswordToken_mailer=require("../mailers/ResetPasswordToken_mailer");



//display the email form
module.exports.EmailForm=function(req,res){
    res.render("email-form");

}
//mail the reset link
module.exports.ResetLink=async function(req,res){

    try{
        let user=await User.findOne({Email:req.body.Email});  

        //if no user exists with this email
        if(!user){
            req.flash("error","Email doesn't exist!");
            return res.redirect("/auth/register-page");
        }

        //if the user exists

        let token=new ResetPasswordToken({
            User:user._id,
            AccessId:crypto.randomBytes(15).toString("hex"),
            IsValid:true
        })

        let token_created=await token.save();  //saving the token in the DB

        await token_created.populate("User","Name Email").execPopulate();

        ResetPasswordToken_mailer.resetToken(token_created);

        req.flash("sweetAlert","Reset Password Link Mailed!");
        return res.redirect("/auth/login-page");

    }catch(err){
        req.flash("error","Error!");
        return res.redirect("back");
    }
   
}



//display the password form
module.exports.PasswordForm=async function(req,res){

    try{
        let token=await ResetPasswordToken.findOne({AccessId:req.query.accessId});

        if(!token){
            req.flash("error","Invalid Link");
            return res.redirect("/auth/login-page");
        }
        else if(token){

            if(!token.IsValid){
                return res.end("Your token has expired");
            }
            else
            {
                return res.render("password-form",{
                    accessId:req.query.accessId
                })
            }
        }

    }catch(err){
        req.flash("error","Error!");
        return res.redirect("back");

    }
}


//update the new password
module.exports.update=async function(req,res){

    if(req.body.Password!=req.body.ConfirmPassword)
    {
        req.flash("error","Passwords don't match");
        return res.redirect("back");
    }
    else
    {
        try{
            let token=await ResetPasswordToken.findOne({AccessId:req.body.accessId});

            //token will exists since before displaying the password form the chekc is there and then it is passed in a hidden way to this ..so 

            await User.findByIdAndUpdate(token.User,{
                Password:req.body.Password
            })

            // await token.remove();
            token.IsValid=false;
            token.save();

            req.flash("success","Password updated successfully!!");
            return res.redirect("/auth/login-page");

        }
        catch(err)
        {
            req.flash("error","Error!");
            return res.redirect("back");
        }
    }
}