const { hashPassword } = require('../utils/bcryptjs')
const userRepository = require('../repositories/user.repository')
const { generateAccessToken, generateRefreshToken } = require('../utils/jwt')

async function login({ email, password }) {
    const user = await userRepository.findUserByEmail(email)
    if (!user) {
        throw new Error('Invalid email or password')
    }
    const isPasswordValid = await hashPassword(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid email or password')
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

module.exports = {
    login
}