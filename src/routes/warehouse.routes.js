const express = require('express')
const router = express.Router()

router.get('/warehouse', (req, res) => {
    res.status(200).json({
        status: 'ok',
        data: [],
        message: 'Warehouse endpoint dummy'
    })
})

module.exports = router