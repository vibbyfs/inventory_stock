const bcryptjs = require('bcryptjs')

async function hashPassword(password) {
    const salt = await bcryptjs.genSalt(10)
    const hashed = await bcryptjs.hash(password, salt)
    return hashed
}

async function comparePassword(password, hashedPassword) {
    const compared = await bcryptjs.compare(password, hashedPassword)
    return compared
}

module.exports = {
    hashPassword,
    comparePassword
}