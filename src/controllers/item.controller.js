const { createItemSchema, updateItemSchem, updateItemSchema } = require('../validation/item.schema')
const itemService = require('../services/item.service')
const { badRequest } = require('../utils/errors')

async function createItem(req, res, next) {
    try {
        const validateData = createItemSchema.parse(req.body)

        const item = await itemService.createItem(validateData)

        res.status(201).json({
            message: 'Item created successfully',
            data: item
        })
    } catch (err) {
        next(err)
    }
}

async function getAllitem(req, res, next) {
    try {
        const items = await itemService.getAllItem()

        res.status(200).json({
            message: 'items fetched successfully',
            data: items
        })
    } catch (err) {
        next(err)
    }
}

async function getItemById(req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            throw badRequest('Invalid item id')
        }

        const item = await itemService.getItemById(id)

        res.status(200).json({
            message: 'Items fetched successfully',
            data: item
        })
    } catch (err) {
        next(err)
    }
}

async function updateItem(req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            throw badRequest('Invalid item id')
        }

        const validateData = updateItemSchema.parse(req.body)

        const item = await itemService.updateitem(validateData)

        res.status(200).json({
            message: 'Item updated successfully',
            data: item
        })
    } catch (err) {
        next(err)
    }
}

async function deleteItem(req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            throw badRequest('Invalid item id')
        }

        const item = await itemService.deleteItem(id)

        res.status(200).json({
            message: 'Item deleted successfully',
            data: item
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createItem,
    getAllitem,
    getItemById,
    updateItem,
    deleteItem
}