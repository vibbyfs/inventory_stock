const express = require('express');
const purchaseOrderController = require('../controllers/purchase-order.controller');
const {
    authentication,
    authorize
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/',
    authentication,
    authorize('admin', 'staff'),
    purchaseOrderController.createPurchaseOrder
);

router.post(
    '/:id/receive',
    authentication,
    authorize('admin', 'staff'),
    purchaseOrderController.receivePurchaseOrder
);

module.exports = router;
