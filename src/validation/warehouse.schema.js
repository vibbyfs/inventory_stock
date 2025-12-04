const { z } = require('zod')

const createWarehouseSchema = z.object({
    name: z.string().min(3, 'Warehouse name is required'),
    location: z.string().min(3, 'Location is required')
})

const updateWarehouseSchema = z.object({
    name: z.string().min(3, 'Warehouse name is required'),
    location: z.string().min(3, 'Location is required')
})

module.exports = {
    createWarehouseSchema,
    updateWarehouseSchema
}
