const { verifyAccessToken } = require("../utils/jwt")
const userRepository = require('../repositories/user.repository')
const { unauthorized, forbidden } = require('../utils/errors')

async function authentication(req, res, next) {
    try {
        const token = req.cookies.access_token

        if (!token) {
            throw unauthorized()
        }

        const decoded = await verifyAccessToken(token)

        const user = await userRepository.findUserByPK(decoded.userId)
        if (!user) {
            throw unauthorized()
        }

        req.user = {
            id: user.id,
            email: user.email,
            roleId: user.roleId,
            roleName: user.role ? user.role.name : null
        }

        next()
    } catch (err) {
        next(err)
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return next(unauthorized())
        }

        if (allowedRoles.length === 0) {
            return next()
        }

        const userRole = req.user.roleName

        if (!allowedRoles || !allowedRoles.includes(userRole)) {
            return next(forbidden())
        }
        next()
    }
}

module.exports = {
    authentication,
    authorize
}