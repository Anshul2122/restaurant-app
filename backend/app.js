const express = require('express');

const cookieParser = require('cookie-parser');
const cors = require('cors');

//importing routes
const user = require('./routes/user.route');
const Myrestaurant = require('./routes/MyRestaurant.route')
const restaurant = require('./routes/restaurant.route');
const order = require("./routes/Order.Route");

const app = express();

if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config({path:"./config/config.env"});
}
//middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials:true,
    method:["GET", "POST", "PUT", "DELETE"],
}
app.use(cors(corsOptions));



// Log each request route
app.use((req, res, next) => {
  console.log(
    "----------------------------------------------------------------------------------"
  );
  console.log(`Route being hit: ${req.method} ${req.path}`);
  console.log("Req Body", req.body);
  console.log("Req Params", req.params);
  console.log("Req Query", req.query);
  console.log(
    "----------------------------------------------------------------------------------"
  );
  next();
});

// user routes
app.use('/api/v1/user', user);
app.use('/api/v1/my/restaurant', Myrestaurant);
app.use('/api/restaurant',restaurant);
app.use('/api/order', order);

module.exports = app;