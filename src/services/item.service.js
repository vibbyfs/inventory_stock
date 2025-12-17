const itemRepository = require('../repositories/item.repository')
const warehouseRepository = require('../repositories/warehouse.repository')
const { notFound, badRequest } = require('../utils/errors')

async function createItem(data) {
    const warehouse = await warehouseRepository.getWarehouseById(data.warehouseId)
    if (!warehouse) {
        throw badRequest('Warehouse not found')
    }

    const item = await itemRepository.createItem(data)
    return item
}

async function getAllItem() {
    const items = await itemRepository.getAllItems()
    return items
}

async function getItemById(id) {
    const item = await itemRepository.getItemById(id)
    if (!item) {
        throw notFound('item not found')
    }
    return item
}

async function updateitem(id, data) {
    const item = await itemRepository.updateItem(id, data)
    if (!item) {
        throw notFound('Item not found')
    }
    return item
}

async function deleteItem(id) {
    const item = await itemRepository.deleteItem(id)
    if (!id) {
        throw notFound('item not found')
    }
    return item
}

module.exports = {
    createItem,
    getAllItem,
    getItemById,
    updateitem,
    deleteItem
}