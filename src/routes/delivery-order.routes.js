// src/routes/delivery-order.routes.js
const express = require('express');
const deliveryOrderController = require('../controllers/delivery-order.controller');
const {
    authenticate,
    authorize
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/',
    authenticate,
    authorize('admin', 'staff'),
    deliveryOrderController.createDeliveryOrder
);

router.post(
    '/:id/ship',
    authenticate,
    authorize('admin', 'staff'),
    deliveryOrderController.shipDeliveryOrder
);

module.exports = router;
