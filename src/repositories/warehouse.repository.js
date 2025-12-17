const { Warehouse, Item } = require('../../models')

async function createWarehouse(data) {
    return Warehouse.create(data)
}

async function getWarehouseById(id) {
    return Warehouse.findByPk(id, {
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
    const warehouse = await Warehouse.findByPk(id)
    if (!warehouse) {
        return null
    }

    await warehouse.update(data)
    return warehouse
}

async function deleteWarehouse(id) {
    const warehouse = await Warehouse.findByPk(id)
    if (!warehouse) {
        return null
    }

    await warehouse.destroy()
    return true
}

module.exports = {
    createWarehouse,
    getWarehouseById,
    getAllWarehouse,
    updateWarehouse,
    deleteWarehouse
}