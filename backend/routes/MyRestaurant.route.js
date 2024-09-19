const express = require('express');
const {registerRestaurant, updateRestaurant, getMyrestaurant} = require("../controller/myRestaurant.controller");
const {isAuthenticated} = require('../middlewares/auth');
const { multiupload } = require('../middlewares/multer');

const router = express.Router();

router.route("/register").post(isAuthenticated,registerRestaurant);
router.route("/MyRestaurant").get(isAuthenticated, getMyrestaurant);
router.route("/update").put(isAuthenticated,multiupload,updateRestaurant);


module.exports = router;