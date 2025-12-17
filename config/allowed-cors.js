const cors = require('cors')

const allowedOriginCors = process.env.CORS_ALLOWED_ORIGIN.split(',')

const corsOptions = {
    origin: allowedOriginCors,
    credentials: true
}

module.exports = cors(corsOptions)