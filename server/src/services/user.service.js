const { hashPassword } = require('../utils/bcryptjs')
const roleRepository = require('../repositories/role.repository')
const userRepository = require('../repositories/user.repository')
const { notFound } = require('../utils/errors')

async function createUser({ name, email, password, roleName }) {
    const role = await roleRepository.findRoleByName(roleName)
    if (!role) {
        throw notFound('Role not found')
    }

    const hashedPassword = await hashPassword(password)

    const user = await userRepository.createUser({
        name,
        email,
        password: hashedPassword,
        role,
    })

    return user
}

module.exports = {
    createUser
}