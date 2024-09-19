const express = require('express');
const {param} = require('express-validator');
const {isAuthenticated} = require('../middlewares/auth');
const { getRestaurants, searchRestaurants } = require('../controller/restaurant.controller');


const router = express.Router();
// api/restaurant/434547e6tyu9isdvhbyy3983
router.route('/:restaurantId').get(param("restaurantId").isString().trim().notEmpty().withMessage("Restaurant parameter must be a valid String"),isAuthenticated, getRestaurants)
// api/restaurant/search/Indore
router.route('/search/:city').get(
    param("city").isString().trim().notEmpty().withMessage("city name required"),
    isAuthenticated, searchRestaurants
);


module.exports = router;