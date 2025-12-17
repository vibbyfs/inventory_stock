const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.routes')
const warehouseRoutes = require('./warehouse.routes')
const itemRoutes = require('./item.routes')
const purchaseOrderRoutes = require('./purchase-order.routes');
const deliveryOrderRoutes = require('./delivery-order.routes');

router.use('/auth', authRoutes)
router.use('/warehouse', warehouseRoutes)
router.use('/items', itemRoutes)
router.use('/purchase-orders', purchaseOrderRoutes);
router.use('/delivery-orders', deliveryOrderRoutes);

module.exports = router