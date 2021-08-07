const express=require("express");
const router=express.Router();
const home_controller=require("../../controllers/home_controller");

router.get("/",home_controller.home);

router.use("/auth",require("./auth"));

router.use("/cart",require("./cart"));

router.use("/orders",require("./orders"));

router.use("/payment",require("./payment"));

router.use("/admin",require("./admin"));

router.use("/forgotPassword",require("./forgot_password"));

module.exports=router;