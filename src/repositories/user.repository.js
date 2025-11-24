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

async function createUser(Userdata) {
    return User.create(Userdata)
}

module.exports = {
    findUserByEmail,
    findUserByPK,
    createUser
}