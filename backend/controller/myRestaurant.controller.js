
const Restaurant = require('../model/Restaurant.model');
// const Order = require('../model/Order.model');

exports.registerRestaurant = async(req, res)=>{
    try {
        const existing = await Restaurant.findOne(req.user._id)

        if(existing){
            return res.status(400).json({
                message:"Restaurant already exists",
                success:false
            });
        }
        const restaurant = await Restaurant.create({
            ...req.body,
            user: req.user._id,
            imageurl:{public_id:"sample_id", url:"sample_url"},
            
            lastUpdated: new Date(),
        });
        res.status(201).json({
            message:"Restaurant created successfully",
            success: true,
            restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });       
    }
};

exports.getMyrestaurant = async(req, res)=>{
    try {
        const restaurant = await Restaurant.findOne({user: req.user._id});
        if(!restaurant){
            return res.status(404).json({
                message:"Restaurant not found",
                success: false
            });
        }
        res.status(200).json({
            message:"Restaurant retrieved successfully",
            success: true,
            restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// to remove the multiple menu items if options were selected previously
const removeDuplicateMenuItems = (newItems, existingItems) => {
    // Create a map to store unique items by name
    const itemMap = new Map();

    // Add existing items to the map
    existingItems.forEach(item => itemMap.set(item.name, item));

    // Add new items to the map, replacing duplicates
    newItems.forEach(item => itemMap.set(item.name, item));

    // Return the values of the map as an array
    return Array.from(itemMap.values());
};

exports.updateRestaurant = async(req, res)=>{
    try {
        const restaurant = await Restaurant.findOne({user: req.user._id });
        if(!restaurant){
            return res.status(404).json({
                message:"Restaurant not found",
                success: false
            });
        }
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = Array.from(new Set([...req.body.cuisines, ...restaurant.cuisines]));
        restaurant.menuItems = removeDuplicateMenuItems(req.body.menuItems,restaurant.menuItems);
        restaurant.lastUpdate = new Date();

        await restaurant.save();
        return res.status(200).json({
            message:"Restaurant updated successfully",
            success: true,
            restaurant
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });       
    }
}