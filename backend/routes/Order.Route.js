const express = require('express');
const { createCheckoutSession } = require('../controller/Order.controller');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();


router.route("/checkout/create-checkout-session").post(createCheckoutSession);

module.exports = router;