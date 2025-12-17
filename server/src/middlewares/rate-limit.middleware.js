const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMs: (Number(process.env.RATE_LIMIT_WINDOWS_MINUTES) || 15) * 60 * 1000,
    max: (Number(process.env.RATE_LIMIT_MAX_REQUEST) || 100),
    message: 'Too many request, please try again later'
})

const loginLimiter = rateLimit({
    windowMs: (Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000,
    max: (Number(process.env.LOGIN_RATE_LIMIT_MAX_REQUEST) || 5),
    message: 'Too many login atemps, please try again later'
})

module.exports = {
    apiLimiter,
    loginLimiter
}