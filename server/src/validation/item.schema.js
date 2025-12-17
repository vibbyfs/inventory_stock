const { z } = require('zod')

const createItemSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    sku: z.string().min(1, 'SKU is required'),
    stock: z.number().int('Stock must be integer').default(0),
    warehouseId: z.number().int('Warehouse id must be integer')
})

const updateItemSchema = z.object({
    name: z.string().min(3, 'Name is required'),
    sku: z.string().min(1, 'SKU is required'),
    stock: z.number().int('Stock must be integer').default(0),
    warehouseId: z.number().int('Warehouse id must be integer')
})

module.exports = {
    createItemSchema,
    updateItemSchema
}