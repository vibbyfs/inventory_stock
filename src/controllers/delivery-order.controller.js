const deliveryOrderService = require('../services/delivery-order.service');
const {
    createDeliveryOrderSchema,
    shipDeliveryOrderSchema
} = require('../validation/delivery-order.schema');
const { badRequest } = require('../utils/errors');

async function createDeliveryOrder(req, res, next) {
    try {
        const validated = createDeliveryOrderSchema.parse(req.body);

        if (!req.user) {
            throw badRequest('User not found in request');
        }

        const deliveryOrder = await deliveryOrderService.createDeliveryOrder({
            customerName: validated.customerName,
            deliveryDate: validated.deliveryDate,
            items: validated.items,
            userId: req.user.id
        });

        res.status(201).json({
            message: 'Delivery order created successfully',
            data: deliveryOrder
        });
    } catch (err) {
        next(err);
    }
}

async function shipDeliveryOrder(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            throw badRequest('Invalid delivery order id');
        }

        const validated = shipDeliveryOrderSchema.parse(req.body);

        if (!req.user) {
            throw badRequest('User not found in request');
        }

        const deliveryOrder = await deliveryOrderService.shipDeliveryOrder({
            doId: id,
            shippedDate: validated.shippedDate,
            userId: req.user.id
        });

        res.status(200).json({
            message: 'Delivery order shipped successfully',
            data: deliveryOrder
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createDeliveryOrder,
    shipDeliveryOrder
};
