const { User, Role } = require('../../models')

async function findUserByEmail(email) {
    return User.findOne({
        where: { email },
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    })
}

async function findUserByPK(id) {
    return User.findByPK(id, {
        include: [
            {
                model: Role,
                as: 'role'
            }
        ]
    })
}

async function createUser(userData) {
    return User.create(userData)
}

module.exports = {
    findUserByEmail,
    findUserByPK,
    createUser
}