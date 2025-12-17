const { z } = require('zod')

const loginSchema = z.object({
    email: z.string().email('Email is required'),
    password: z.string().min(6, 'Password is required')

})

module.exports = {
    loginSchema
}