const mongoose=require("mongoose");

const pizzaSchema=new mongoose.Schema({
    Image:{
        type:String
    },
    Name:{
        type:String
    },
    Type:{
        type:String
    },
    Price:{
        type:Number
    }
})


const Pizza=mongoose.model("Pizza",pizzaSchema);

module.exports=Pizza;