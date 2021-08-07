const express=require("express");
const router=express.Router();
const orders_controller=require("../../controllers/orders_controller");
const passport=require("passport");

router.post("/place-order",passport.checkAuthentication,orders_controller.placeOrder);

router.get("/customer-all-orders",passport.checkAuthentication,orders_controller.customerAllOrders);

router.get("/track/:id",passport.checkAuthentication,orders_controller.trackPage);

module.exports=router;