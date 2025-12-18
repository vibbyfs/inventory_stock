const express = require('express')
const app = express()
const apiRoutes = require('./routes')
const errorHandler = require('./middlewares/errorhandler.js')
const corsOrigin = require('../config/allowed-cors')
const { apiLimiter } = require('./middlewares/rate-limit.middleware')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const { swaggerUi, swaggerSpec } = require('../config/swagger')

app.use(helmet())
app.use(corsOrigin)
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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