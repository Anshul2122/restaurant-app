
const Restaurant = require("../model/Restaurant.model");
const Order = require("../model/Order.model");
const STRIPE = process.env.STRIPE_API_KEY;
const stripe = require('stripe')(STRIPE);
const  STIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;
 
const getMyOrders = async(req, res)=>{
  try {
    const userId = req.user._id;
    // console.log("user id: ",userId);
    
    const orders = await Order.find({user:userId}).populate("restaurant").populate("user");
    // console.log(" get my orders : ",orders);
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"something went wrong", success:false});
  }
};

const stripeWebhookHandler = async(req, res)=>{

  let event;
  try {
    const rawBody = req.body.toString('utf8');
    
    const sig = req.headers['stripe-signature'];
    
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      STIPE_ENDPOINT_SECRET,
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(`webhook error: ${error.message}`);
  }

  console.log("event type", event.type)

  if(event.type === 'checkout.session.completed') {
    const order = await Order.findById(event.data.object.metadata?.restaurantId);
    if(!order){
      return res.status(404).json({message:"Order not found"});
    }
    console.log("order", order)
    order.totalAmount = ((event.data.object.amount_total)/100).toFixed(2);
    order.status = 'paid';

    await order.save();
  }

  res.status(200).json({message:"payment successful ", success: true});
}


const createCheckoutSession = async(req,res)=>{
  try {
    const restaurant = await Restaurant.findById(req.body.restaurantId);

    if(!restaurant){
      throw new Error("restaurant not found");
    }    

    console.log("restaurant: ",restaurant);

    const newOrder = new Order({
      restaurant:restaurant,
      user:restaurant.user,
      status:"placed",
      deliveryDetails:req.body.deliveryDetails,
      cartItems:req.body.cartItems,
      createdAt:new Date(),
    })

    console.log("newOrder: ",newOrder);

    const lineItems = createLineItems(
      {
        cartItems: req.body.cartItems,
        restaurantId: req.body.restaurantId,
    },
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

const createLineItems = (checkoutSessionRequest="", menuItems)=>{
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem)=>{
    const menuItem = menuItems.find((item) => {
      return item._id.toString() === cartItem.menuItemId.toString()
    });
    
    if(!menuItem) throw new Error("menu item not found");
    
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
    
    return line_items;
  });

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

  return sessionData;
}

module.exports ={getMyOrders, createCheckoutSession, stripeWebhookHandler };
