const express = require('express')
const { authentication, authorize } = require('../middlewares/auth.middleware')
const router = express.Router()
const warehouseController = require('../controllers/warehouse.controller')

router.post('/', authentication, authorize('admin'), warehouseController.createWarehouse)
router.get('/', authentication, authorize('admin', 'staff', 'viewer'), warehouseController.getAllWarehouse)
router.get('/:id', authentication, authorize('admin', 'staff', 'viewer'), warehouseController.getWarehouseById)
router.put('/:id', authentication, authorize('admin'), warehouseController.updateWarehouse)
router.delete('/:id', authentication, authorize('admin'), warehouseController.deleteWarehouse)

module.exports = router