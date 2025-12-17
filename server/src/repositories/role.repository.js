const { Role } = require('../../models')

async function findRoleByName(name) {
    return Role.findOne({
        where: { name }
    })
}

async function getAllRole() {
    return Role.findAll()
}

module.exports = {
    findRoleByName,
    getAllRole
}