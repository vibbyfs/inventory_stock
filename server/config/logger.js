const { createLogger, format, transports, level } = require('winston')

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf((info) => {
            return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
})

module.exports = logger