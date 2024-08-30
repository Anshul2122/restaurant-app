const express = require('express');

const {register, update, logout, login, getUser} = require("../controller/user.controller");
const { isAuthenticated } = require('../middlewares/auth');
const { singleupload } = require('../middlewares/multer');
// const { singleImage } = require('../middlewares/multer');

const router = express.Router();

router.route("/register").post(register);
router.route('/update').put(isAuthenticated, singleupload, update);
router.route('/currentuser').get(isAuthenticated, getUser);
router.route('/logout').get(logout);
router.route('/login').post(login);

// middleware for image upload
module.exports = router;