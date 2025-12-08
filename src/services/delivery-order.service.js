const {
    sequelize,
    Item,
    StockMovement
} = require('../../models');
const deliveryOrderRepository = require('../repositories/delivery-order.repository');
const { badRequest, notFound } = require('../utils/errors');

async function createDeliveryOrder({
    customerName,
    deliveryDate,
    items,
    userId
}) {
    const t = await sequelize.transaction();

    try {
        const code = `DO-${Date.now()}`;

        const doData = {
            code,
            customerName,
            status: 'draft',
            deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
            createdBy: userId
        };

        const itemsData = items.map((i) => ({
            itemId: i.itemId,
            quantity: i.quantity,
            quantityShipped: 0,
            unitPrice: i.unitPrice || null
        }));

        const deliveryOrder = await deliveryOrderRepository.createDeliveryOrder(
            doData,
            itemsData,
            t
        );

        const doWithItems = await deliveryOrderRepository.findDeliveryOrderById(
            deliveryOrder.id,
            t
        );

        await t.commit();

        return doWithItems;
    } catch (err) {
        if (!t.finished) {
            await t.rollback();
        }
        throw err;
    }
}

async function shipDeliveryOrder({ doId, shippedDate, items, userId }) {
    const t = await sequelize.transaction();

    try {
        const deliveryOrder = await deliveryOrderRepository.findDeliveryOrderById(
            doId,
            t
        );

        if (!deliveryOrder) {
            throw notFound('Delivery order not found');
        }

        if (deliveryOrder.status === 'cancelled') {
            throw badRequest('Cannot ship a cancelled delivery order');
        }

        if (deliveryOrder.status === 'shipped') {
            throw badRequest('Delivery order already fully shipped');
        }

        const shippedMap = new Map();
        for (const i of items) {
            shippedMap.set(i.itemId, i.quantityShipped);
        }

        let anyShipped = false;

        const updatedInfo = [];

        for (const doItem of deliveryOrder.items) {
            const qtyToShip = shippedMap.get(doItem.itemId) || 0;

            if (qtyToShip <= 0) {
                continue;
            }

            anyShipped = true;

            const newQtyShipped = doItem.quantityShipped + qtyToShip;

            if (newQtyShipped > doItem.quantity) {
                throw badRequest(
                    `Shipped quantity cannot exceed ordered quantity for item ${doItem.itemId}`
                );
            }

            await doItem.update(
                { quantityShipped: newQtyShipped },
                { transaction: t }
            );

            updatedInfo.push({
                itemId: doItem.itemId,
                quantity: doItem.quantity,
                quantityShipped: newQtyShipped
            });

            const item = await Item.findByPk(doItem.itemId, { transaction: t });

            if (!item) {
                throw badRequest('Item not found');
            }

            if (item.stock < qtyToShip) {
                throw badRequest(
                    `Not enough stock for item id ${doItem.itemId}`
                );
            }

            const previousStock = item.stock;
            const newStock = previousStock - qtyToShip;

            await item.update({ stock: newStock }, { transaction: t });

            await StockMovement.create(
                {
                    itemId: doItem.itemId,
                    warehouseId: item.warehouseId,
                    type: 'OUT',
                    referenceType: 'DO',
                    referenceId: deliveryOrder.id,
                    quantityChange: qtyToShip,
                    previousStock,
                    newStock,
                    note: `Ship DO ${deliveryOrder.code}`,
                    createdBy: userId
                },
                { transaction: t }
            );
        }

        if (!anyShipped) {
            throw badRequest('No quantity to ship');
        }

        let allShipped = true;

        for (const doItem of deliveryOrder.items) {
            const info = updatedInfo.find((u) => u.itemId === doItem.itemId);

            const qtyOrdered = info ? info.quantity : doItem.quantity;
            const qtyShippedNow = info
                ? info.quantityShipped
                : doItem.quantityShipped;

            if (qtyShippedNow < qtyOrdered) {
                allShipped = false;
                break;
            }
        }

        const newStatus = allShipped ? 'shipped' : 'confirmed';

        await deliveryOrderRepository.updateDeliveryOrder(
            deliveryOrder.id,
            {
                status: newStatus,
                deliveryDate: new Date(shippedDate),
                updatedBy: userId
            },
            t
        );

        const updatedDo = await deliveryOrderRepository.findDeliveryOrderById(
            deliveryOrder.id,
            t
        );

        await t.commit();

        return updatedDo;
    } catch (err) {
        if (!t.finished) {
            await t.rollback();
        }
        throw err;
    }
}

module.exports = {
    createDeliveryOrder,
    shipDeliveryOrder
};
