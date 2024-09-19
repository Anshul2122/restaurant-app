

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
    },
    name:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,

    },
});

const restaurantSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurantName:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    deliveryPrice:{
        type: Number,
    },
    estimatedDeliveryTime:{
        type: Number,
    },
    cuisines:[{
        type: String,
    }],
    menuItems:[
        MenuItemSchema
    ],
    imageurl:{
        public_id: {
            type: String,
            required: true,
        },
        url:{
            type: String,
        },
    },
    lastUpdate:{
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("Restaurant", restaurantSchema);