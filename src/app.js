const express = require('express')
const app = express()
const apiRoutes = require('./routes')
const errorHandler = require('./middlewares/errorhandler')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is running"
    })
})

app.use('/api/v1', apiRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    })
})

app.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        status: "error",
        message: "Internal server error"
    })
})

app.use(errorHandler)

module.exports = app