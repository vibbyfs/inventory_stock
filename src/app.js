const express = require('express')
const app = express()
const apiRoutes = require('./routes')
const errorHandler = require('./middlewares/errorhandler')
const corsOrigin = require('../config/allowed-cors')
const { apiLimiter } = require('./middlewares/rate-limit.middleware')
const helmet = require('helmet')
const morgan = require('morgan')

app.use(helmet())
app.use(corsOrigin)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is running"
    })
})

app.use('/api/v1', apiLimiter, apiRoutes)

app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    })
})

app.use(errorHandler)

module.exports = app