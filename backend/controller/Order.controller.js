
const Restaurant = require("../model/Restaurant.model");
const Order = require("../model/Order.model");
const STRIPE = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(STRIPE);

const FRONTEND_URL = process.env.FRONTEND_URL;

// exports.getMyOrder = async(req, res)=>{
//   try {
//     const orders = await Order.find({user:req.userId}).populate("restaurant").populate("user");

//     return res.json(orders);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message:"something went wrong", success:false});
//   }
// };



const createCheckoutSession = async(req,res)=>{
  try {
    // console.log("heelo ")
    // console.log(" ye hai req body isme sara body ka data aana chaiye yaar: ", req.body)
    const { checkoutSessionRequest } = req.body;
    // console.log("yhe hai checkout sessions request: ",checkoutSessionRequest)
    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);
    // console.log("checkout session request: ", checkoutSessionRequest);
    // console.log("cartItems: ", checkoutSessionRequest.cartItems);
    // console.log("resturantId : ", checkoutSessionRequest.restaurantId);
    if(!restaurant){
      throw new Error("restaurant not found");
    }    

    const newOrder = new Order({
      restaurant:restaurant,
      user:req.userId,
      status:"placed",
      deliveryDetails:checkoutSessionRequest.deliveryDetails,
      cartItems:checkoutSessionRequest.cartItems,
      createdAt:new Date(),
    })

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems,
    );

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant._id.toString(),
      restaurant.deliveryPrice
    );

    if(!session.url){
      return res.status(500).json({message:"Error creating stripe session"});
    }
    
    await newOrder.save();

    res.json({url: session.url});
  } catch(error){
    console.log(error);
    return res.status(500).json({message:error.message, success:false});
  }
};

const createLineItems = (checkoutSessionRequest, menuItems)=>{
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem)=>{
    // console.log("cart items id : ",cartItem._id);
    const menuItem = menuItems.find((item) => {
      // console.log("items id: ", item._id);
      return item._id.toString() === cartItem._id.toString()
    });
    // console.log("menuItem: ", menuItem)
    if(!menuItem){
      throw new Error("menu item not found");
    }
    const line_items={
      price_data:{
        currency:"inr",
        unit_amount:(menuItem.price * 1000).toFixed(0) ,
        product_data:{
          name:menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };
   // console.log("line_items: ", line_items)
    return line_items;
  });
  //console.log("line items: ", lineItems);

  return lineItems;
};


const createSession = async(lineItems, restaurantId, orderId)=>{
  const sessionData = await stripe.checkout.sessions.create({
    line_items:lineItems,
    shipping_options:[
      {
        shipping_rate:'shr_1PzIOGHYn2dioh6Qd94BgLTo'
      },
    ],
    mode:'payment',
    metadata:{
      orderId,
      restaurantId
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/details/${restaurantId}?cancelled=true`,
  });
  //console.log("session data: " ,  sessionData)
  // console.log("session id: ",sessionData.id)
  return sessionData;
}

module.exports ={ createCheckoutSession };
