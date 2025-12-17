const itemRepository = require('../repositories/item.repository')
const warehouseRepository = require('../repositories/warehouse.repository')
const { notFound, badRequest } = require('../utils/errors')
const redisClient = require('../../config/redis')
const logger = require('../../config/logger')

const DEFAULT_TTL = (Number(process.env.REDIS_DEFAULT_TTL) || 60)
const ITEM_LIST_CHACHE_KEY = 'items:all'

async function getAllItem() {
    try {
        const cached = await redisClient.get(ITEM_LIST_CHACHE_KEY)
        if (cached) {
            return JSON.parse(cached)
        }
    } catch (err) {
        logger.error(`Redis get all items error:`, err.message)
    }

    const items = await itemRepository.getAllItems()

    try {
        await redisClient.setEx(
            ITEM_LIST_CHACHE_KEY,
            DEFAULT_TTL,
            JSON.stringify(items)
        )
    } catch (err) {
        logger.error('Redis set error getAllItems:', err.message);
    }
    return items
}

async function getItemById(id) {
    const item = await itemRepository.getItemById(id)
    if (!item) {
        throw notFound('item not found')
    }
    return item
}

async function createItem(data) {
    const warehouse = await warehouseRepository.getWarehouseById(data.warehouseId)
    if (!warehouse) {
        throw badRequest('Warehouse not found')
    }

    const item = await itemRepository.createItem(data)

    try {
        await redisClient.del(ITEM_LIST_CHACHE_KEY)
    } catch (err) {
        logger.error('Redis del error createItem:', err.message)
    }
    return item
}

async function updateitem(id, data) {
    const item = await itemRepository.updateItem(id, data)
    if (!item) {
        throw notFound('Item not found')
    }

    try {
        await redisClient.del(ITEM_LIST_CHACHE_KEY)
    } catch (err) {
        logger.error('Redis del updateItem error:', err.message)
    }

    return item
}

async function deleteItem(id) {
    const item = await itemRepository.deleteItem(id)
    if (!id) {
        throw notFound('item not found')
    }

    try {
        await redisClient.del(ITEM_LIST_CHACHE_KEY)
    } catch (err) {
        logger.error('Redis del deleteItem error:', err.message)
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