const {
    DeliveryOrder,
    DeliveryOrderItem,
    Item,
    User
} = require('../../models');

async function createDeliveryOrder(doData, itemsData, transaction) {
    const deliveryOrder = await DeliveryOrder.create(doData, { transaction });

    const itemsToCreate = itemsData.map((item) => ({
        ...item,
        deliveryOrderId: deliveryOrder.id
    }));

    await DeliveryOrderItem.bulkCreate(itemsToCreate, { transaction });

    return deliveryOrder;
}

async function findDeliveryOrderById(id, transaction) {
    return DeliveryOrder.findByPk(id, {
        include: [
            {
                model: DeliveryOrderItem,
                as: 'items',
                include: [
                    {
                        model: Item,
                        as: 'item'
                    }
                ]
            },
            {
                model: User,
                as: 'createdByUser'
            },
            {
                model: User,
                as: 'updatedByUser'
            }
        ],
        transaction
    });
}

async function updateDeliveryOrder(id, data, transaction) {
    const deliveryOrder = await DeliveryOrder.findByPk(id, { transaction });

    if (!deliveryOrder) {
        return null;
    }

    await deliveryOrder.update(data, { transaction });
    return deliveryOrder;
}

module.exports = {
    createDeliveryOrder,
    findDeliveryOrderById,
    updateDeliveryOrder
};
