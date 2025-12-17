const warehouseRepository = require('../repositories/warehouse.repository')
const { notFound } = require('../utils/errors')

async function createWarehouse(data) {
    const warehouse = await warehouseRepository.createWarehouse(data)
    return warehouse
}

async function getAllWarehouse() {
    const warehouse = await warehouseRepository.getAllWarehouse()
    return warehouse
}

async function getWarehouseById(id) {
    const warehouse = await warehouseRepository.getWarehouseById(id)
    if (!warehouse) {
        throw notFound('Warehouse not found')
    }
    return warehouse
}

async function updateWarehouse(id, data) {
    const warehouse = await warehouseRepository.updateWarehouse(id, data)
    if (!warehouse) {
        throw notFound('Warehosue not found')
    }
    return warehouse
}

async function deleteWarehouse(id) {
    const deleteWarehouse = await warehouseRepository.deleteWarehouse(id)
    if (!deleteWarehouse) {
        throw notFound('Warehouse not found')
    }
    return deleteWarehouse
}

module.exports = {
    createWarehouse,
    getAllWarehouse,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
}
