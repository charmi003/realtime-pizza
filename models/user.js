const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    Cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    },
    Orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }],
    Role:{
        type:String,
        default:"customer"
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema);
module.exports=User;