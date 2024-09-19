const Restaurant = require('../model/Restaurant.model');

exports.getRestaurants = async(req, res) => {
    try {
      const restaurantId = req.params.restaurantId;
      const restaurant = await Restaurant.findById(restaurantId);
      if(!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      return res.json(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });       
    }
}


exports.searchRestaurants = async(req, res)=>{
  try {
    // query parameters ko URL se get kar rhe hai
    const city = req.params.city;
    const searchQuery = (req.query.searchQuery) || "";
    const selectedCuisines = (req.query.selectedCuisines) || "";
    const sortOption = (req.query.sortOption) || "lastUpdated";
    const page = parseInt(req.query.page) || 1;

    let query = {};

    query['city'] = new RegExp(city, 'i'); // regex -> searching case insensitive 
    const cityCheck = await Restaurant.countDocuments(query); // city mein restaurant check kar rhe hai

    if(cityCheck === 0){
      return res.status(404).json({ message: "No restaurants found in this city", 
        data:[], pagination:{total:0, page:1, pages:1},
       });
    }
    if(selectedCuisines){
      // if cuisine select ki gayi hai to usko 
      //array mein daal kar query['cuisine'] mein add kar k 
      //filter kar rhe hai
      const cuisineArray = selectedCuisines.split(',').map(cuisine=> new RegExp(cuisine, "i"));
      query['cuisines'] = { $all: cuisineArray };
    }
      //searchQuery agar di gayi hai to query mein 
      //restaurantName aur cuisines fields ko search karte hain
      // using regular expressions. 
      //$or use karte hain taaki ya to name ya phir cuisine match ho sake.
    if(searchQuery){
      const searchRegex = new RegExp(searchQuery, "i");
      query['$or'] = [
        { restaurantName: searchRegex }, // **Search by restaurant name**
        { cuisines: { $in: [searchRegex] } } // **Search by cuisine name**
      ];
    }

    const pageSize = 10;
    const skip = (page-1) * pageSize;


    // yha pe mongodb query execute karta hai using find() method sorting aur pagination ke saath query results ko limit kar rha hain.
    const restaurants = await Restaurant.find(query)
    .sort({[sortOption]:1})
    .skip(skip)
    .limit(pageSize)
    .lean();

    const total = await Restaurant.countDocuments(query);
    const  response = {
      data:restaurants,
      pagination:{
        total,
        page,
        pages:Math.ceil(total/pageSize),
      }
    }
    return res.status(200).json({message:`here are the all restaurants in ${city}`,success:true, response});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", success:false}); 
  }
}