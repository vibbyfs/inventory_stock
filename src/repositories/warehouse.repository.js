const { Warehouse, Item } = require('../../models')

async function createWarehouse(data) {
    return Warehouse.create(data)
}

async function findWarehouseById(id) {
    return Warehouse.findByPK(id, {
        include: [
            {
                model: Item,
                as: 'items'
            }
        ]
    })
}

async function getAllWarehouse() {
    return Warehouse.findAll()
}

async function updateWarehouse(id, data) {
    const warehouse = await Warehouse.findByPK(id)
    if (!warehouse) {
        return null
    }

    await warehouse.update(data)
    return warehouse
}

async function deleteWarehouse(id) {
    const warehouse = await Warehouse.findByPK(id)
    if (!warehouse) {
        return null
    }

    await warehouse.destroy()
    return true
}

module.exports = {
    createWarehouse,
    findWarehouseById,
    getAllWarehouse,
    updateWarehouse,
    deleteWarehouse
}