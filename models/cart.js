const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    Items:[{
        Pizza:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Pizza"
        },
        Quantity:{
            type:Number
        }
    }],
    TotalQuantity:{
        type:Number
    },
    TotalPrice:{
        type:Number
    }
},{
    timestamps:true
})


const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;