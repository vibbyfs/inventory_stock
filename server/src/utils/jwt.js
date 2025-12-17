const jwt = require('jsonwebtoken')

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret'
const ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m'
const REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

async function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN
    })
}

async function generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_EXPIRES_IN
    })
}

async function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_TOKEN_SECRET)
}

async function verifyRefreshToken(token) {
    return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}