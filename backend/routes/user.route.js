const express = require('express');

const {register, update, logout, login} = require("../controller/user.controller");
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.route("/register").post(register);
router.route('/update').put(isAuthenticated, update);
router.route('/logout').get(logout);
router.route('/login').post(login);
module.exports = router;