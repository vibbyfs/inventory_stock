const {
    sequelize,
    Item,
    StockMovement
} = require('../../models');
const purchaseOrderRepository = require('../repositories/purchase-order.repository');
const { badRequest, notFound } = require('../utils/errors');

async function createPurchaseOrder({ supplierName, orderDate, items, userId }) {
    const t = await sequelize.transaction();

    try {
        const code = `PO-${Date.now()}`;

        const poData = {
            code,
            supplierName,
            status: 'DRAFT',
            orderDate: new Date(orderDate),
            createdBy: userId
        };

        const itemsData = items.map((i) => ({
            itemId: i.itemId,
            quantityOrdered: i.quantityOrdered,
            quantityReceived: 0,
            unitPrice: i.unitPrice || null
        }));

        const purchaseOrder = await purchaseOrderRepository.createPurchaseOrder(
            poData,
            itemsData,
            t
        );

        await t.commit();

        const poWithItems = await purchaseOrderRepository.findPurchaseOrderById(
            purchaseOrder.id
        );

        return poWithItems;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function receivePurchaseOrder({ poId, receivedDate, items, userId }) {
    const t = await sequelize.transaction();

    try {
        const po = await purchaseOrderRepository.findPurchaseOrderById(poId, t);

        if (!po) {
            throw notFound('Purchase order not found');
        }

        if (po.status === 'CANCELLED') {
            throw badRequest('Cannot receive a cancelled purchase order');
        }

        if (po.status === 'RECEIVED') {
            throw badRequest('Purchase order already received');
        }

        const receivedMap = new Map();
        for (const i of items) {
            receivedMap.set(i.itemId, i.quantityReceived);
        }

        for (const poItem of po.items) {
            const qtyToReceive = receivedMap.get(poItem.itemId) || 0;

            if (qtyToReceive <= 0) {
                continue;
            }

            const newQtyReceived = poItem.quantityReceived + qtyToReceive;

            if (newQtyReceived > poItem.quantityOrdered) {
                throw badRequest('Received quantity cannot exceed ordered quantity');
            }

            await poItem.update(
                { quantityReceived: newQtyReceived },
                { transaction: t }
            );

            const item = await Item.findByPk(poItem.itemId, { transaction: t });
            if (!item) {
                throw badRequest('Item not found');
            }

            const previousStock = item.stock;
            const newStock = previousStock + qtyToReceive;

            await item.update({ stock: newStock }, { transaction: t });

            await StockMovement.create(
                {
                    itemId: poItem.itemId,
                    warehouseId: item.warehouseId,
                    type: 'IN',
                    referenceType: 'PO',
                    referenceId: po.id,
                    quantityChange: qtyToReceive,
                    previousStock,
                    newStock,
                    note: `Receive PO ${po.code}`,
                    createdBy: userId
                },
                { transaction: t }
            );
        }

        await purchaseOrderRepository.updatePurchaseOrder(
            po.id,
            {
                status: 'RECEIVED',
                receivedDate: new Date(receivedDate),
                updatedBy: userId
            },
            t
        );

        await t.commit();

        const updatedPo = await purchaseOrderRepository.findPurchaseOrderById(po.id);
        return updatedPo;
    } catch (err) {
        await t.rollback();
        throw err;
    }
}

module.exports = {
    createPurchaseOrder,
    receivePurchaseOrder
};
