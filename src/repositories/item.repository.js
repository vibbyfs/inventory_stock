const { Item, Warehouse } = require('../../models')

async function createItem(data) {
    return Item.create(data)
}

async function getItemById(id) {
    return Item.findByPk(id, {
        include: [
            {
                model: Warehouse,
                as: 'warehouse'
            }
        ]
    })
}

async function getAllItems() {
    return Item.findAll()
}

async function updateItem(id, data) {
    const item = await Item.findByPk(id)
    if (!item) {
        return null
    }

    await item.update(data)
    return item
}

async function deleteItem(id) {
    const item = await Item.findByPk(id)
    if (!item) {
        return null
    }

    await item.destroy()
    return true
}

module.exports = {
    createItem,
    getItemById,
    getAllItems,
    updateItem,
    deleteItem
}
