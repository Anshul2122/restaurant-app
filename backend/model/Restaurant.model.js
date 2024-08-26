

const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type: Number,

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
        public_id: String,
        url: String,
    },
    lastUpdate:{
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("Restaurant", restaurantSchema);