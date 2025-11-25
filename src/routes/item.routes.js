const express = require('express')
const { authentication } = require('../middlewares/auth.middleware')
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: [],
        message: 'Item endpoint dummy'
    })
})

module.exports = router