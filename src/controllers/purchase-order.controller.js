const purchaseOrderService = require('../services/purchase-order.service');
const {
    createPurchaseOrderSchema,
    receivePurchaseOrderSchema
} = require('../validation/purchase-order.schema');
const { badRequest } = require('../utils/errors');

async function createPurchaseOrder(req, res, next) {
    try {
        const validated = createPurchaseOrderSchema.parse(req.body);

        if (!req.user) {
            throw badRequest('User not found in request');
        }

        const po = await purchaseOrderService.createPurchaseOrder({
            supplierName: validated.supplierName,
            orderDate: validated.orderDate,
            items: validated.items,
            userId: req.user.id
        });

        res.status(201).json({
            message: 'Purchase order created successfully',
            data: po
        });
    } catch (err) {
        next(err);
    }
}

async function receivePurchaseOrder(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            throw badRequest('Invalid purchase order id');
        }

        const validated = receivePurchaseOrderSchema.parse(req.body);

        if (!req.user) {
            throw badRequest('User not found in request');
        }

        const po = await purchaseOrderService.receivePurchaseOrder({
            poId: id,
            receivedDate: validated.receivedDate,
            items: validated.items,
            userId: req.user.id
        });

        res.status(200).json({
            message: 'Purchase order received successfully',
            data: po
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createPurchaseOrder,
    receivePurchaseOrder
};
