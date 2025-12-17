const { PurchaseOrder, PurchaseOrderItem, Item, User } = require('../../models')

async function createPurchaseOrder(poData, itemsData, transaction) {
    const purchaseOrder = await PurchaseOrder.create(poData, { transaction })

    const itemsToCreate = itemsData.map((item) => ({
        ...item,
        purchaseOrderId: purchaseOrder.id
    }))

    await PurchaseOrderItem.bulkCreate(itemsToCreate, { transaction })

    return purchaseOrder
}

async function findPurchaseOrderById(id, transaction) {
    return PurchaseOrder.findByPk(id, {
        include: [
            {
                model: PurchaseOrderItem,
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
                as: 'creator',
                attributes: { exclude: ['password'] }
            },
            {
                model: User,
                as: 'updater',
                attributes: { exclude: ['password'] }
            }

        ],
        transaction
    })
}

async function updatePurchaseOrder(id, data, transaction) {
    const purchaseOrder = await PurchaseOrder.findByPk(id, { transaction })

    if (!purchaseOrder) {
        return null
    }

    await purchaseOrder.update(data, { transaction })
    return purchaseOrder
}

module.exports = {
    createPurchaseOrder,
    findPurchaseOrderById,
    updatePurchaseOrder
}


