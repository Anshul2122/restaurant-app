const express = require('express');
//importing routes
const user = require('./routes/user.route');
const cookieParser = require('cookie-parser');

const app = express();

if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config({path:"./config/config.env"});
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// user routes
app.use('/api/v1/user', user);

module.exports = app;