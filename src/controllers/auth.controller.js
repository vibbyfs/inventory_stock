const authService = require('../services/auth.service')

async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await authService.login({ email, password })

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId
        }

        res.status(200).json({
            status: 'success',
            data: userWithoutPassword
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    login
}