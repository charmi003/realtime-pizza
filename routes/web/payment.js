const express=require("express");
const router=express.Router();
const payment_controller=require("../../controllers/payment_controller");
const passport=require("passport");

router.get("/page",passport.checkAuthentication,payment_controller.display);

router.get("/",passport.checkAuthentication,payment_controller.payment);


//raazorpay...callback url of razorpay is a post req by default...since some info is sent int he headers...
router.post("/complete/",passport.checkAuthentication,payment_controller.complete);


//cod
router.get("/complete/",passport.checkAuthentication,payment_controller.complete);

module.exports=router;
