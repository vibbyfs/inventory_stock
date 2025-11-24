const { Item, Warehouse } = require('../../models')

async function createItem(data) {
    return Item.create(data)
}

async function findItemByPK(id) {
    return Item.findByPK(id, {
        include: Warehouse,
        as: 'warehouse'
    })
}

async function getAllItems() {
    return Item.findAll()
}

async function updateItem(id, data) {
    const item = await Item.findByPK(id)
    if (!item) {
        return null
    }

    await item.update(data)
    return item
}

async function deleteItem(id) {
    const item = await item.findByPK(id)
    if (!item) {
        return null
    }

    await item.destroy()
    return true
}

module.exports = {
    createItem,
    findItemByPK,
    getAllItems,
    updateItem,
    deleteItem
}
