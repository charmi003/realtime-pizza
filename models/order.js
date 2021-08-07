const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
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
    TotalPrice:{
        type:Number
    },
    Phone:{
        type:"String"
    },
    Address:{
        type:String
    },
    PaymentType:{
        type:String,
        default:"COD"
    },
    Status:{
        type:String,
        default:'placed'
    }
},{
    timestamps:true
})


const Order=mongoose.model("Order",orderSchema);

module.exports=Order;