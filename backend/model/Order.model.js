const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deliveryDetails:{
        email:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        }
    },
    cartItems:[
        {
            menuItemId:{
                type:String,
                required: true
            },
            quantity:{
                type: Number,
                required: true,
            },
            name:{
                type: String,
                required: true
            },
        },
    ],
    totalAmount:Number,
    status:{
        type: String,
        enum: ["placed", "paid", "inProgress", "OutForDelivery", "Delivered"],
        
    },
    createdAt:{
        type:Date, default:Date.now
    },
})

module.exports = mongoose.model("Order", orderSchema);