const express = require('express');
const {registerRestaurant, updateRestaurant, getMyrestaurant} = require("../controller/myRestaurant.controller");
const {isAuthenticated} = require('../middlewares/auth');

const router = express.Router();

router.route("/register").post(isAuthenticated,registerRestaurant);
router.route("/MyRestaurant").get(isAuthenticated, getMyrestaurant);
router.route("/update").put(isAuthenticated,updateRestaurant);


module.exports = router;