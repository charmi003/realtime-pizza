const express=require("express");
const router=express.Router();
const cart_controller=require("../../controllers/cart_controller");
const passport=require("passport");

router.get("/",passport.checkAuthentication,cart_controller.display);

router.get("/add/:id",passport.checkAuthentication,cart_controller.add);

router.get("/increase-qty/",passport.checkAuthentication,cart_controller.increase);

router.get("/decrease-qty/",passport.checkAuthentication,cart_controller.decrease);

router.get("/remove/",passport.checkAuthentication,cart_controller.remove);

module.exports=router;