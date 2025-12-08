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
            status: 'DRAFT',
            deliveryDate: deliveryDate ? new Date(deliveryDate) : null,
            createdBy: userId
        };

        const itemsData = items.map((i) => ({
            itemId: i.itemId,
            quantity: i.quantity,
            unitPrice: i.unitPrice || null
        }));

        const deliveryOrder = await deliveryOrderRepository.createDeliveryOrder(
            doData,
            itemsData,
            t
        );

        await t.commit();

        const doWithItems = await deliveryOrderRepository.findDeliveryOrderById(
            deliveryOrder.id
        );

        return doWithItems;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function shipDeliveryOrder({ doId, shippedDate, userId }) {
    const t = await sequelize.transaction();

    try {
        const deliveryOrder = await deliveryOrderRepository.findDeliveryOrderById(
            doId,
            t
        );

        if (!deliveryOrder) {
            throw notFound('Delivery order not found');
        }

        if (deliveryOrder.status === 'CANCELLED') {
            throw badRequest('Cannot ship a cancelled delivery order');
        }

        if (deliveryOrder.status === 'SHIPPED') {
            throw badRequest('Delivery order already shipped');
        }

        for (const doItem of deliveryOrder.items) {
            const item = await Item.findByPk(doItem.itemId, { transaction: t });

            if (!item) {
                throw badRequest('Item not found');
            }

            if (item.stock < doItem.quantity) {
                throw badRequest(
                    `Not enough stock for item id ${doItem.itemId}`
                );
            }

            const previousStock = item.stock;
            const newStock = previousStock - doItem.quantity;

            await item.update({ stock: newStock }, { transaction: t });

            await StockMovement.create(
                {
                    itemId: doItem.itemId,
                    warehouseId: item.warehouseId,
                    type: 'OUT',
                    referenceType: 'DO',
                    referenceId: deliveryOrder.id,
                    quantityChange: doItem.quantity,
                    previousStock,
                    newStock,
                    note: `Ship DO ${deliveryOrder.code}`,
                    createdBy: userId
                },
                { transaction: t }
            );
        }

        await deliveryOrderRepository.updateDeliveryOrder(
            deliveryOrder.id,
            {
                status: 'SHIPPED',
                deliveryDate: new Date(shippedDate),
                updatedBy: userId
            },
            t
        );

        await t.commit();

        const updatedDo = await deliveryOrderRepository.findDeliveryOrderById(
            deliveryOrder.id
        );
        return updatedDo;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

module.exports = {
    createDeliveryOrder,
    shipDeliveryOrder
};
