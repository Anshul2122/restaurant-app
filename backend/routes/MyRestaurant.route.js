const express = require('express');
const {registerRestaurant, updateRestaurant, getMyrestaurant, getMyRestaurantOrders} = require("../controller/myRestaurant.controller");
const {isAuthenticated} = require('../middlewares/auth');
const { multiupload } = require('../middlewares/multer');

const router = express.Router();

router.route("/register").post(isAuthenticated,registerRestaurant);
router.route("/MyRestaurant").get(isAuthenticated, getMyrestaurant);
router.route("/order").get(isAuthenticated, getMyRestaurantOrders);
router.route("/update").put(isAuthenticated,multiupload,updateRestaurant);


module.exports = router;