const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { loginLimiter } = require('../middlewares/rate-limit.middleware')

router.post('/login', loginLimiter, authController.login)

module.exports = router