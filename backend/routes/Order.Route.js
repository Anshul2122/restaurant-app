const express = require('express');
const { createCheckoutSession, stripeWebhookHandler, getMyOrders } = require('../controller/Order.controller');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();


router.route('/getMyOrders').get(isAuthenticated, getMyOrders)

router.route("/checkout/webhook").post(stripeWebhookHandler);


router.route("/create-checkout-session").post(isAuthenticated,  createCheckoutSession);

module.exports = router;