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

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            status: 'success',
            data: {
                user: userWithoutPassword
            }
        })
    } catch (err) {
        next(err)
    }
}

async function refresh(req, res, next) {
    try {
        const { refresh_token } = req.cookies

        if (!refresh_token) {
            throw badRequest('Refresh token is required')
        }

        const tokens = await authService.refreshToken(refresh_token)

        res.cookie('access_token', tokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        })

        res.cookie('refresh_token', tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            status: 'success',
            message: 'Token refreshed successfully'
        })
    } catch (err) {
        next(err)
    }
}

async function logout(req, res, next) {
    try {
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })

        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    login,
    refresh,
    logout
}