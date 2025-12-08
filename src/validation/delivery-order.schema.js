const { z } = require('zod');

const deliveryOrderItemInputSchema = z.object({
    itemId: z
        .number()
        .int('itemId must be integer'),
    quantity: z
        .number()
        .int('quantity must be integer')
        .min(1, 'quantity must be at least 1'),
    unitPrice: z
        .number()
        .optional()
});

const createDeliveryOrderSchema = z.object({
    customerName: z
        .string()
        .min(1, 'customerName is required'),
    deliveryDate: z
        .string()
        .optional(),
    items: z
        .array(deliveryOrderItemInputSchema)
        .min(1, 'At least one item is required')
});

const shipDeliveryOrderSchema = z.object({
    shippedDate: z
        .string()
        .min(1, 'shippedDate is required')
});

module.exports = {
    createDeliveryOrderSchema,
    shipDeliveryOrderSchema
};
