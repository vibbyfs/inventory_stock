const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { loginLimiter } = require('../middlewares/rate-limit.middleware')

router.post('/login', loginLimiter, authController.login)
router.post('/refresh-token', authController.refresh)
router.post('/logout', authController.logout)

module.exports = router