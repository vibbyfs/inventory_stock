const authService = require('../services/auth.service')
const { loginSchema } = require('../validation/auth.schema')
const { badRequest } = require('../utils/errors')

async function login(req, res, next) {

    try {
        const validateData = loginSchema.parse(req.body)
        const { email, password } = validateData
        const { user, access_token, refresh_token } = await authService.login({ email, password })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId
        }
        res.status(200).json({
            status: 'success',
            data: {
                user: userWithoutPassword,
                access_token,
                refresh_token
            }
        })
    } catch (err) {
        next(err)
    }
}

async function refresh(req, res, next) {
    try {
        const { refresh_token } = req.body

        if (!refresh_token) {
            throw badRequest('Refresh token is required')
        }

        const tokens = await authService.refreshToken(refresh_token)

        res.status(200).json({
            status: 'success',
            data: tokens
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    refresh
}