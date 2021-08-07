const express=require("express");
const router=express.Router();
const admin_controller=require("../../controllers/admin_controller");
const passport=require("passport");

router.get("/all-orders",passport.checkAuthenticationAdmin,admin_controller.allOrders);

router.post("/update-order-status/",passport.checkAuthenticationAdmin,admin_controller.updateOrderStatus);


module.exports=router;