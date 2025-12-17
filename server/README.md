# Warehouse CMS (Inventory Management System)

A web-based warehouse and inventory management system for managing stock, purchase orders, delivery orders, and stock movements across multiple warehouses. Tech stack: Express.js, REST API, Sequelize, PostgreSQL, JWT, Zod, Bcrypt.js, Winston, Helmet, Rate Limiting.

## Tech Stack

- **Backend Framework**: Express.js
- **API Architecture**: RESTful API
- **ORM**: Sequelize
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, Rate Limiting, CORS
- **Validation**: Zod
- **Password Hashing**: Bcrypt.js
- **Logging**: Winston
- **Environment Management**: Dotenv

## Features

### Authentication & Authorization

- User authentication with JWT
- Role-based access control (Admin, Manager, Staff)
- Token-based session management
- Password hashing and encryption

### Warehouse Management

- Multiple warehouse support
- Warehouse location tracking
- CRUD operations for warehouses

### Inventory Management

- Item management with SKU tracking
- Real-time stock monitoring
- Stock levels per warehouse
- Item categorization

### Purchase Order Management

- Create and manage purchase orders
- Track order status (draft, pending, approved, rejected)
- Purchase order items tracking
- Quantity ordered vs quantity received tracking
- Supplier management
- Unit price tracking

### Delivery Order Management

- Create and manage delivery orders
- Track delivery status (draft, confirmed, shipped, cancelled)
- Customer name tracking
- Delivery date scheduling
- Delivery order items management

### Stock Movement Tracking

- Comprehensive stock movement logging
- Movement types: IN, OUT, ADJUSTMENT
- Reference tracking (PO, DO, Manual Adjustment)
- Previous and new stock recording
- Movement notes and audit trail
- User tracking for stock changes

### Security Features

- API rate limiting
- Login attempt limiting
- Helmet security headers
- CORS protection
- Environment-based configuration

### Error Handling

- Centralized error handling
- Custom error classes
- Validation error handling
- Sequelize error handling
- JWT error handling

## Project Structure

```
inventory_stock/
├── config/
│   ├── allowed-cors.js       # CORS configuration
│   ├── config.js             # Database configuration
│   └── logger.js             # Winston logger setup
├── migrations/               # Database migrations
├── models/                   # Sequelize models
│   ├── deliveryorder.js
│   ├── deliveryorderitem.js
│   ├── item.js
│   ├── purchaseorder.js
│   ├── purchaseorderitem.js
│   ├── role.js
│   ├── stockmovement.js
│   ├── user.js
│   └── warehouse.js
├── seeders/                  # Database seeders
├── src/
│   ├── controllers/          # Route controllers
│   ├── middlewares/          # Custom middlewares
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.js
│   │   └── rate-limit.middleware.js
│   ├── repositories/         # Data access layer
│   ├── routes/              # API routes
│   ├── services/            # Business logic layer
│   ├── utils/               # Utility functions
│   │   ├── bcryptjs.js
│   │   ├── errors.js
│   │   └── jwt.js
│   ├── validation/          # Zod validation schemas
│   ├── app.js               # Express app setup
│   └── server.js            # Server entry point
├── .env                     # Environment variables
├── .gitignore
├── eslint.config.mjs        # ESLint configuration
├── package.json
└── README.md
```

## Database Schema

### Core Tables

- **Users**: User accounts with role-based access
- **Roles**: User role definitions
- **Warehouses**: Warehouse locations and information
- **Items**: Product/item master data with SKU
- **PurchaseOrders**: Purchase order headers
- **PurchaseOrderItems**: Purchase order line items
- **DeliveryOrders**: Delivery order headers
- **DeliveryOrderItems**: Delivery order line items
- **StockMovements**: Stock movement audit trail

## Installation

1. Clone the repository

```bash
git clone https://github.com/vibbyfs/warehouse_cms.git
cd warehouse_cms
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up database

```bash
# Create database
createdb warehouse_cms

# Run migrations
npx sequelize-cli db:migrate

# Run seeders (optional)
npx sequelize-cli db:seed:all
```

5. Start the development server

```bash
npm run dev
```

## Environment Variables

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=warehouse_cms
DB_HOST=localhost
DB_DIALECT=postgres

# JWT
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOWS_MINUTES=15
RATE_LIMIT_MAX_REQUEST=100
LOGIN_RATE_LIMIT_WINDOW_MINUTES=15
LOGIN_RATE_LIMIT_MAX_REQUEST=5

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login

### Warehouses

- `GET /api/v1/warehouse` - Get all warehouses
- `GET /api/v1/warehouse/:id` - Get warehouse by ID
- `POST /api/v1/warehouse` - Create warehouse (Admin only)
- `PUT /api/v1/warehouse/:id` - Update warehouse (Admin only)
- `DELETE /api/v1/warehouse/:id` - Delete warehouse (Admin only)

### Items

- `GET /api/v1/items` - Get all items
- `GET /api/v1/items/:id` - Get item by ID
- `POST /api/v1/items` - Create item (Admin/Manager)
- `PUT /api/v1/items/:id` - Update item (Admin/Manager)
- `DELETE /api/v1/items/:id` - Delete item (Admin only)

## Scripts

```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## Development

### Code Style

- ESLint for code linting
- Prettier for code formatting
- Consistent naming conventions
- Repository pattern for data access
- Service layer for business logic

### Best Practices

- Environment-based configuration
- Centralized error handling
- Request validation with Zod
- Secure password hashing
- JWT token authentication
- Rate limiting for API protection
- CORS configuration
- Structured logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Author

Vibby FS

## Repository

[https://github.com/vibbyfs/warehouse_cms](https://github.com/vibbyfs/warehouse_cms)
