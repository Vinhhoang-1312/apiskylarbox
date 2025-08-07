# Skylarbox API Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the root directory with the following variables:
```env
# Server Configuration
PORT=3000
SERVER_MODE=development
NODE_APP_INSTANCE=0

# MongoDB Configuration
MONGO_HOST=mongodb://localhost:27017/skylarbox
MONGO_OPTIONS_USER=
MONGO_OPTIONS_PASS=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Logging Configuration
LOG_CONSOLE=enabled
LOG_CONSOLE_LEVEL=info
LOG_ROTATE_FILE=enabled
LOG_ROTATE_FILE_LEVEL=debug
LOG_ROTATE_FILE_NAME=logs/app.log
LOG_ROTATE_FILE_MAX_SIZE=25000000
LOG_ROTATE_FILE_MAX_DAYS=15
```

4. Start MongoDB service

5. Run the application:
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:
`http://localhost:3000/api/docs`

## Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token

### Partners
- `GET /api/partners` - Get all partners (public)
- `GET /api/partners/:id` - Get partner by ID (public)
- `POST /api/partners` - Create new partner (protected)
- `PATCH /api/partners/:id` - Update partner (protected)
- `DELETE /api/partners/:id` - Delete partner (protected)

### Categories
- `GET /api/categories` - Get all categories (public)
- `GET /api/categories/:id` - Get category by ID (public)
- `POST /api/categories` - Create new category (protected)
- `PATCH /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `POST /api/products` - Create new product (protected)
- `PATCH /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Featured Boxes
- `GET /api/featured-boxes` - Get all featured boxes (public)
- `GET /api/featured-boxes/:id` - Get featured box by ID (public)
- `POST /api/featured-boxes` - Create new featured box (protected)
- `PATCH /api/featured-boxes/:id` - Update featured box (protected)
- `DELETE /api/featured-boxes/:id` - Delete featured box (protected)

### Blog
- `GET /api/blog` - Get all blog posts (public)
- `GET /api/blog/:id` - Get blog post by ID (public)
- `POST /api/blog` - Create new blog post (protected)
- `PATCH /api/blog/:id` - Update blog post (protected)
- `DELETE /api/blog/:id` - Delete blog post (protected)

### Testimonials
- `GET /api/testimonials` - Get all testimonials (public)
- `GET /api/testimonials/:id` - Get testimonial by ID (public)
- `POST /api/testimonials` - Create new testimonial (protected)
- `PATCH /api/testimonials/:id` - Update testimonial (protected)
- `DELETE /api/testimonials/:id` - Delete testimonial (protected)

## Authentication

For protected endpoints, include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Features

- **CRUD Operations**: Full CRUD operations for all entities
- **Authentication**: JWT-based authentication system
- **Pagination**: Built-in pagination for list endpoints
- **Search**: Search functionality for all entities
- **Validation**: Input validation using class-validator
- **Documentation**: Auto-generated Swagger documentation
- **Logging**: Comprehensive logging system
- **Error Handling**: Global exception handling
- **Tracing**: Request tracing with unique IDs
