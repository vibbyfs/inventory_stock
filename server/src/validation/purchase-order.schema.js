const { z } = require('zod');

const purchaseOrderItemInputSchema = z.object({
    itemId: z
        .number()
        .int('itemId must be integer'),
    quantityOrdered: z
        .number()
        .int('quantityOrdered must be integer')
        .min(1, 'quantityOrdered must be at least 1'),
    unitPrice: z
        .number()
        .optional()
});

const createPurchaseOrderSchema = z.object({
    supplierName: z
        .string()
        .min(1, 'supplierName is required'),
    orderDate: z
        .string()
        .min(1, 'orderDate is required'),
    items: z
        .array(purchaseOrderItemInputSchema)
        .min(1, 'At least one item is required')
});

const receivePurchaseOrderItemSchema = z.object({
    itemId: z
        .number()
        .int('itemId must be integer'),
    quantityReceived: z
        .number()
        .int('quantityReceived must be integer')
        .min(1, 'quantityReceived must be at least 1')
});

const receivePurchaseOrderSchema = z.object({
    receivedDate: z
        .string()
        .min(1, 'receivedDate is required'),
    items: z
        .array(receivePurchaseOrderItemSchema)
        .min(1, 'At least one item is required')
});

module.exports = {
    createPurchaseOrderSchema,
    receivePurchaseOrderSchema
};
