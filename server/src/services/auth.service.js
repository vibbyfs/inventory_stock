const { hashPassword } = require('../utils/bcryptjs')
const userRepository = require('../repositories/user.repository')
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/jwt')
const { unauthorized } = require('../utils/errors')

async function login({ email, password }) {
    const user = await userRepository.findUserByEmail(email)
    if (!user) {
        throw unauthorized('Invalid email or password')
    }
    const isPasswordValid = await hashPassword(password, user.password)
    if (!isPasswordValid) {
        throw unauthorized('Invalid email or password')
    }

    const payload = {
        userId: user.id,
        roleId: user.roleId
    }

    const access_token = await generateAccessToken(payload)
    const refresh_token = await generateRefreshToken(payload)

    return {
        user,
        access_token,
        refresh_token
    }
}

async function refreshToken(token) {
    try {
        const decoded = await verifyRefreshToken(token)

        const payload = {
            userId: decoded.userId,
            roleId: decoded.roleId
        }

        const newAccessToken = await generateAccessToken(payload)
        const newRefreshToken = await generateRefreshToken(payload)

        return {
            access_token: newAccessToken,
            refresh_token: newRefreshToken
        }
    } catch (error) {
        throw unauthorized('Invalid or expired refresh token')
    }
}

module.exports = {
    login,
    refreshToken
}