const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Warehouse CMS API Documentation',
            version: '1.0.0',
            description: 'A comprehensive warehouse and inventory management system API for managing stock, purchase orders, delivery orders, and stock movements across multiple warehouses.',
            contact: {
                name: 'Vibby FS',
                url: 'https://github.com/vibbyfs/warehouse_cms',
            },
            license: {
                name: 'ISC',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
            {
                url: 'https://api.warehouse-cms.com',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Error message',
                        },
                    },
                },
                LoginRequest: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            example: 'admin@example.com',
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            minLength: 6,
                            example: 'password123',
                        },
                    },
                },
                LoginResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'success',
                        },
                        data: {
                            type: 'object',
                            properties: {
                                user: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'integer',
                                            example: 1,
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'Admin User',
                                        },
                                        email: {
                                            type: 'string',
                                            example: 'admin@mail.com',
                                        },
                                        roleId: {
                                            type: 'integer',
                                            example: 1,
                                        },
                                    },
                                },
                                access_token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                },
                                refresh_token: {
                                    type: 'string',
                                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                },
                            },
                        },
                    },
                },
                Warehouse: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Jakarta Warehouse',
                        },
                        location: {
                            type: 'string',
                            example: 'Jakarta Barat',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                CreateWarehouseRequest: {
                    type: 'object',
                    required: ['name', 'location'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 3,
                            example: 'Jakarta Warehouse',
                        },
                        location: {
                            type: 'string',
                            minLength: 3,
                            example: 'Jakarta Barat',
                        },
                    },
                },
                Item: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        name: {
                            type: 'string',
                            example: 'Laptop Dell XPS 13',
                        },
                        sku: {
                            type: 'string',
                            example: 'LAP-DELL-XPS13',
                        },
                        stock: {
                            type: 'integer',
                            example: 50,
                        },
                        warehouseId: {
                            type: 'integer',
                            example: 1,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                CreateItemRequest: {
                    type: 'object',
                    required: ['name', 'sku', 'warehouseId'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 3,
                            example: 'Laptop Dell XPS 13',
                        },
                        sku: {
                            type: 'string',
                            minLength: 1,
                            example: 'LAP-DELL-XPS13',
                        },
                        stock: {
                            type: 'integer',
                            default: 0,
                            example: 50,
                        },
                        warehouseId: {
                            type: 'integer',
                            example: 1,
                        },
                    },
                },
                PurchaseOrderItem: {
                    type: 'object',
                    required: ['itemId', 'quantityOrdered', 'unitPrice'],
                    properties: {
                        itemId: {
                            type: 'integer',
                            example: 1,
                        },
                        quantityOrdered: {
                            type: 'integer',
                            minimum: 1,
                            example: 100,
                        },
                        unitPrice: {
                            type: 'number',
                            format: 'decimal',
                            minimum: 0,
                            example: 15000000,
                            description: 'Unit price (defaults to 0 if not provided)',
                        },
                    },
                },
                CreatePurchaseOrderRequest: {
                    type: 'object',
                    required: ['supplierName', 'orderDate', 'items'],
                    properties: {
                        supplierName: {
                            type: 'string',
                            example: 'PT. Supplier Electronics',
                        },
                        orderDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-08',
                        },
                        items: {
                            type: 'array',
                            minItems: 1,
                            items: {
                                $ref: '#/components/schemas/PurchaseOrderItem',
                            },
                        },
                    },
                },
                PurchaseOrder: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        code: {
                            type: 'string',
                            example: 'PO-20251208-001',
                        },
                        supplierName: {
                            type: 'string',
                            example: 'PT. Supplier Electronics',
                        },
                        status: {
                            type: 'string',
                            enum: ['draft', 'pending', 'approved', 'rejected'],
                            example: 'draft',
                            description: 'Status: draft (newly created), pending (partially received), approved (fully received), rejected (cancelled)',
                        },
                        orderDate: {
                            type: 'string',
                            format: 'date-time',
                        },
                        receivedDate: {
                            type: 'string',
                            format: 'date-time',
                            nullable: true,
                            description: 'Date when purchase order was received (null until received)',
                        },
                        createdBy: {
                            type: 'integer',
                            example: 1,
                            description: 'User ID who created the purchase order',
                        },
                        updatedBy: {
                            type: 'integer',
                            example: 1,
                            nullable: true,
                            description: 'User ID who last updated the purchase order (automatically set)',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                ReceivePurchaseOrderItem: {
                    type: 'object',
                    required: ['itemId', 'quantityReceived'],
                    properties: {
                        itemId: {
                            type: 'integer',
                            example: 1,
                        },
                        quantityReceived: {
                            type: 'integer',
                            minimum: 1,
                            example: 100,
                        },
                    },
                },
                ReceivePurchaseOrderRequest: {
                    type: 'object',
                    required: ['receivedDate', 'items'],
                    properties: {
                        receivedDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-10',
                        },
                        items: {
                            type: 'array',
                            minItems: 1,
                            items: {
                                $ref: '#/components/schemas/ReceivePurchaseOrderItem',
                            },
                        },
                    },
                },
                DeliveryOrderItem: {
                    type: 'object',
                    required: ['itemId', 'quantity'],
                    properties: {
                        itemId: {
                            type: 'integer',
                            example: 1,
                        },
                        quantity: {
                            type: 'integer',
                            minimum: 1,
                            example: 10,
                        },
                        unitPrice: {
                            type: 'number',
                            format: 'decimal',
                            example: 18000000,
                        },
                    },
                },
                CreateDeliveryOrderRequest: {
                    type: 'object',
                    required: ['customerName', 'items'],
                    properties: {
                        customerName: {
                            type: 'string',
                            example: 'PT. Customer Technology',
                        },
                        deliveryDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-15',
                        },
                        items: {
                            type: 'array',
                            minItems: 1,
                            items: {
                                $ref: '#/components/schemas/DeliveryOrderItem',
                            },
                        },
                    },
                },
                DeliveryOrder: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        code: {
                            type: 'string',
                            example: 'DO-20251208-001',
                        },
                        customerName: {
                            type: 'string',
                            example: 'PT. Customer Technology',
                        },
                        status: {
                            type: 'string',
                            enum: ['draft', 'confirmed', 'shipped', 'cancelled'],
                            example: 'draft',
                            description: 'Status: draft (newly created), confirmed (ready to ship), shipped (completed), cancelled (rejected)',
                        },
                        deliveryDate: {
                            type: 'string',
                            format: 'date-time',
                        },
                        createdBy: {
                            type: 'integer',
                            example: 1,
                            description: 'User ID who created the delivery order',
                        },
                        updatedBy: {
                            type: 'integer',
                            example: 1,
                            nullable: true,
                            description: 'User ID who last updated the delivery order (automatically set)',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                ShipDeliveryOrderItem: {
                    type: 'object',
                    required: ['itemId', 'quantityShipped'],
                    properties: {
                        itemId: {
                            type: 'integer',
                            example: 1,
                        },
                        quantityShipped: {
                            type: 'integer',
                            minimum: 1,
                            example: 10,
                            description: 'Quantity to ship (can be partial)',
                        },
                    },
                },
                ShipDeliveryOrderRequest: {
                    type: 'object',
                    required: ['shippedDate', 'items'],
                    properties: {
                        shippedDate: {
                            type: 'string',
                            format: 'date',
                            example: '2025-12-15',
                        },
                        items: {
                            type: 'array',
                            minItems: 1,
                            items: {
                                $ref: '#/components/schemas/ShipDeliveryOrderItem',
                            },
                            description: 'Items to ship with quantities (supports partial shipping)',
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Authentication',
                description: 'User authentication endpoints',
            },
            {
                name: 'Warehouses',
                description: 'Warehouse management endpoints',
            },
            {
                name: 'Items',
                description: 'Item/Product management endpoints',
            },
            {
                name: 'Purchase Orders',
                description: 'Purchase order management endpoints',
            },
            {
                name: 'Delivery Orders',
                description: 'Delivery order management endpoints',
            },
        ],
        paths: {
            '/api/v1/auth/login': {
                post: {
                    tags: ['Authentication'],
                    summary: 'User login',
                    description: 'Authenticate user and receive JWT access token',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/LoginRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Login successful',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/LoginResponse',
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Invalid credentials',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        429: {
                            description: 'Too many login attempts',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/auth/refresh-token': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Refresh access token',
                    description: 'Get new access token and refresh token using existing refresh token',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['refresh_token'],
                                    properties: {
                                        refresh_token: {
                                            type: 'string',
                                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                            description: 'Refresh token received from login',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Token refreshed successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: {
                                                type: 'string',
                                                example: 'success',
                                            },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    access_token: {
                                                        type: 'string',
                                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                                    },
                                                    refresh_token: {
                                                        type: 'string',
                                                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Refresh token is required',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Invalid or expired refresh token',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/warehouse': {
                get: {
                    tags: ['Warehouses'],
                    summary: 'Get all warehouses',
                    description: 'Retrieve list of all warehouses',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Warehouses fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Warehouse fetched successfully',
                                            },
                                            data: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Warehouse',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Warehouses'],
                    summary: 'Create warehouse',
                    description: 'Create a new warehouse (Admin only)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateWarehouseRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Warehouse created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Warehouse created successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Warehouse',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request - Validation error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden - Admin access required',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/warehouse/{id}': {
                get: {
                    tags: ['Warehouses'],
                    summary: 'Get warehouse by ID',
                    description: 'Retrieve warehouse details by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Warehouse ID',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Warehouse fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Warehouse fetched successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Warehouse',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Warehouse not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
                put: {
                    tags: ['Warehouses'],
                    summary: 'Update warehouse',
                    description: 'Update warehouse by ID (Admin only)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Warehouse ID',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateWarehouseRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Warehouse updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Warehouse updated successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Warehouse',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Warehouse not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ['Warehouses'],
                    summary: 'Delete warehouse',
                    description: 'Delete warehouse by ID (Admin only)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Warehouse ID',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Warehouse deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Warehouse deleted successfully',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Warehouse not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/items': {
                get: {
                    tags: ['Items'],
                    summary: 'Get all items',
                    description: 'Retrieve list of all items',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Items fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Items fetched successfully',
                                            },
                                            data: {
                                                type: 'array',
                                                items: {
                                                    $ref: '#/components/schemas/Item',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Items'],
                    summary: 'Create item',
                    description: 'Create a new item (Admin only)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateItemRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Item created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Item created successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Item',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/items/{id}': {
                get: {
                    tags: ['Items'],
                    summary: 'Get item by ID',
                    description: 'Retrieve item details by ID',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Item ID',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Item fetched successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Item fetched successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Item',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Item not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
                put: {
                    tags: ['Items'],
                    summary: 'Update item',
                    description: 'Update item by ID (Admin/Staff)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Item ID',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateItemRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Item updated successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Item updated successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/Item',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Item not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
                delete: {
                    tags: ['Items'],
                    summary: 'Delete item',
                    description: 'Delete item by ID (Admin only)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Item ID',
                        },
                    ],
                    responses: {
                        200: {
                            description: 'Item deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Item deleted successfully',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Item not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/purchase-orders': {
                post: {
                    tags: ['Purchase Orders'],
                    summary: 'Create purchase order',
                    description: 'Create a new purchase order (Admin/Staff)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreatePurchaseOrderRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Purchase order created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Purchase order created successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/PurchaseOrder',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/purchase-orders/{id}/receive': {
                post: {
                    tags: ['Purchase Orders'],
                    summary: 'Receive purchase order',
                    description: 'Mark purchase order as received and update stock (Admin/Staff)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Purchase Order ID',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ReceivePurchaseOrderRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Purchase order received successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Purchase order received successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/PurchaseOrder',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Purchase order not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/delivery-orders': {
                post: {
                    tags: ['Delivery Orders'],
                    summary: 'Create delivery order',
                    description: 'Create a new delivery order (Admin/Staff)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateDeliveryOrderRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        201: {
                            description: 'Delivery order created successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Delivery order created successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/DeliveryOrder',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/v1/delivery-orders/{id}/ship': {
                post: {
                    tags: ['Delivery Orders'],
                    summary: 'Ship delivery order (partial or full)',
                    description: 'Ship items from delivery order. Supports partial shipping - status will be "confirmed" if partially shipped, "shipped" when all items are shipped. Stock will be deducted for shipped quantities. (Admin/Staff only)',
                    security: [
                        {
                            bearerAuth: [],
                        },
                    ],
                    parameters: [
                        {
                            name: 'id',
                            in: 'path',
                            required: true,
                            schema: {
                                type: 'integer',
                            },
                            description: 'Delivery Order ID',
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ShipDeliveryOrderRequest',
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: 'Delivery order shipped successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            message: {
                                                type: 'string',
                                                example: 'Delivery order shipped successfully',
                                            },
                                            data: {
                                                $ref: '#/components/schemas/DeliveryOrder',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        400: {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        401: {
                            description: 'Unauthorized',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        403: {
                            description: 'Forbidden',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                        404: {
                            description: 'Delivery order not found',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Error',
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
