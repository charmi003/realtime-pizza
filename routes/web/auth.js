const express=require("express");
const router=express.Router();
const auth_controller=require("../../controllers/auth_controller");
const passport=require("passport");

router.get("/register-page",auth_controller.registerPage);

router.post("/register",auth_controller.register);

router.get("/login-page",auth_controller.loginPage);

router.post("/login",passport.authenticate("local",{
    failureRedirect:"/auth/login-page"
}),auth_controller.login);

router.get("/logout",auth_controller.logout);

module.exports=router;