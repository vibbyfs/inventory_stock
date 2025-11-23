const express = require('express')
const router = express.Router()

const authRoutes = require('./auth.routes')
const warehouseRoutes = require('./warehouse.routes')
const itemRoutes = require('./item.routes')

router.use('/auth', authRoutes)
router.use('/warehouse', warehouseRoutes)
router.use('/items', itemRoutes)

module.exports = router