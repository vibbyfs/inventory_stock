const express = require('express')
const { authentication, authorize } = require('../middlewares/auth.middleware')
const router = express.Router()
const itemController = require('../controllers/item.controller')

router.post('/', authentication, authorize('admin'), itemController.createItem)
router.get('/', authentication, authorize('admin', 'staff', 'viewer'), itemController.getAllitem)
router.get('/:id', authentication, authorize('admin', 'staff', 'viewer'), itemController.getItemById)
router.put('/:id', authentication, authorize('admin', 'staff'), itemController.updateItem)
router.delete('/:id', authentication, authorize('admin'), itemController.deleteItem)

module.exports = router