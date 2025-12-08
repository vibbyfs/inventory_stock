const express = require('express');
const purchaseOrderController = require('../controllers/purchase-order.controller');
const {
    authenticate,
    authorize
} = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
    '/',
    authenticate,
    authorize('admin', 'staff'),
    purchaseOrderController.createPurchaseOrder
);

router.post(
    '/:id/receive',
    authenticate,
    authorize('admin', 'staff'),
    purchaseOrderController.receivePurchaseOrder
);

module.exports = router;
