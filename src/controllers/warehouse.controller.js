const { createWarehouseSchema, updateWarehouseSchema } = require('../validation/warehouse.schema')
const warehouseService = require('../services/warehouse.service')
const { notFound, badRequest } = require('../utils/errors')

async function createWarehouse(req, res, next) {
    try {
        const data = await createWarehouseSchema.parse(req.body)

        const warehouse = await warehouseService.createWarehouse(data)

        res.status(201).json({
            message: 'Warehosue created successfully',
            data: warehouse
        })
    } catch (err) {
        next(err)
    }
}

async function getAllWarehouse(req, res, next) {
    try {
        const warehouse = await warehouseService.getAllWarehouse()

        res.status(200).json({
            message: 'Warehouse fetched successfully',
            data: warehouse
        })
    } catch (err) {
        next(err)
    }
}

async function getWarehouseById(req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            throw badRequest('Invalid warehouse id')
        }

        const warehouse = await warehouseService.getWarehouseById(id)

        res.status(200).json({
            message: 'Warehouse fetched successfully',
            data: warehouse
        })
    } catch (err) {
        next(err)
    }
}

async function updateWarehouse(req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            throw badRequest('Invalid warehouse id')
        }

        const data = await updateWarehouseSchema.parse(req.body)

        const warehouse = await warehouseService.updateWarehouse(id, data)

        res.status(200).json({
            message: 'Warehouse updated successfully',
            data: warehouse
        })
    } catch (err) {
        next(err)
    }
}

async function deleteWarehouse(req, res, next) {
    try {
        const id = req.params.id
        if (!id) {
            throw badRequest('Invalid warehouse id')
        }

        const warehouse = await warehouseService.deleteWarehouse(id)

        res.status(200).json({
            message: 'Warehouse deleted successfully',
            data: warehouse
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createWarehouse,
    getAllWarehouse,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
}