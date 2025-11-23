const express = require('express')
const router = express.Router()

router.get('/item', (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: [],
        message: 'Item endpoint dummy'
    })
})

module.exports = router