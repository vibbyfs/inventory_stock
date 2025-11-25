const userRepository = require('../repositories/user.repository')
const { comparePassword } = require('../utils/bcryptjs')

async function login({ email, password }) {
    const user = await userRepository.findUserByEmail(email)
    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isPasswordValid = await comparePassword(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid email or password')
    }

    return user
}

module.exports = {
    login
}