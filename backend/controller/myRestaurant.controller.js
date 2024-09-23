const Order = require('../model/Order.model');
const Restaurant = require('../model/Restaurant.model');
const { getDataUri } = require('../utils/dataUri');
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
      const images = req.files;
      console.log("these are images : ",  images);
      let myCloudd ;
      if(images){
        try{
          const fileUri = getDataUri(images);
          myCloudd = await cloudinary.uploader.upload(fileUri.content);
          } catch(e){
            console.log('error in uploading images to cloudinary: ', e);
            return res.status(500).json({ message: "Error uploading images to cloudinary" , success:false});
          }
        }
        if(restaurant.deliveryPrice)  restaurant.deliveryPrice = req.body.deliveryPrice;
        if(restaurant.estimatedDeliveryTime) restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        if(restaurant.cuisines) restaurant.cuisines = Array.from(new Set([...req.body.cuisines, ...restaurant.cuisines]));
        if(restaurant.menuItems) restaurant.menuItems = removeDuplicateMenuItems(req.body.menuItems,restaurant.menuItems);
        if(restaurant.lastUpdate) restaurant.lastUpdate = new Date();

        if(myCloudd){
          restaurant.imageurl ={
            public_id:myCloudd.public_id,
            url:myCloudd.secure_url,
          };
        }
        console.log(restaurant,imageurl.url);

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

exports.getMyRestaurantOrders = async(req, res)=>{
  try {
    const restaurant = await Restaurant.findOne({user: req.user._id });
    if(!restaurant){
      return res.status(404).json({ message:"Restaurant not found",success: false})
    }

    const orders = await Order.find({restaurant:restaurant._id}).populate("restaurant").populate("user");

    return res.status(200).json({
      message:"Restaurant updated successfully",
      success: true,
      orders
    });
  } catch (error) {
    console.log("error: ",error);
    return res.status(500).json({ message: "Something went wrong"});
  }
}