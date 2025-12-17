const express = require('express');
const deliveryOrderController = require('../controllers/delivery-order.controller');
const {
    authentication,
    authorize
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/',
    authentication,
    authorize('admin', 'staff'),
    deliveryOrderController.createDeliveryOrder
);

router.post(
    '/:id/ship',
    authentication,
    authorize('admin', 'staff'),
    deliveryOrderController.shipDeliveryOrder
);

module.exports = router;
