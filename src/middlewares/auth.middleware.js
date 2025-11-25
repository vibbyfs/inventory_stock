const { verifyAccessToken } = require("../utils/jwt")
const userRepository = require('../repositories/user.repository')

async function authentication(req, res, next) {
    try {
        const authorization = req.headers.authorization

        const rawToken = authorization.split(' ')
        const keyToken = rawToken[0]
        const valueToken = rawToken[1]

        if (keyToken !== 'Bearer' || !valueToken) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' })
        }

        const token = verifyAccessToken(valueToken)
        console.log(token);

        const user = await userRepository.findUserByPK(token.userId)
        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized' })
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
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized'
            })
        }

        if (allowedRoles.length === 0) {
            return next()
        }

        const userRole = req.user.roleName

        if (!allowedRoles || !allowedRoles.includes(userRole)) {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden'
            })
        }
        next()
    }
}

module.exports = {
    authentication,
    authorize
}