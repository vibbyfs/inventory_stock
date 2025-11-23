const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Login endpoint dummy"
    })
})

module.exports = router