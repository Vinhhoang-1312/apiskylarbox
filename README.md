# 🚀 SkylarBox API

A comprehensive NestJS REST API for the SkylarBox platform with full authentication, user management, and content management features.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Modules Overview](#-modules-overview)
- [API Endpoints](#-api-endpoints)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Development](#-development)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT Authentication** with access and refresh tokens
- **Role-based Access Control** (Admin, User, Moderator)
- **Password Security** with bcrypt hashing
- **Token Management** with expiration handling
- **Password Reset** functionality

### 👥 User Management
- **Complete CRUD Operations** for users
- **Business ID Support** for multi-tenant architecture
- **User Profiles** with extended information
- **Admin Management** tools
- **Soft Delete** functionality

### 📦 Content Management
- **Products Module** - Individual and box products
- **Categories Module** - Hierarchical category structure
- **Blog Module** - Content management with SEO
- **Featured Boxes** - Special promotional content
- **Partners Module** - Sponsorship management

### 🛠️ Technical Features
- **Repository Pattern** for clean data access
- **Service Layer** with business logic separation
- **DTO Validation** with class-validator
- **Swagger Documentation** for all APIs
- **Comprehensive Logging** with Winston
- **Error Handling** with global exception filter
- **Tracer ID** support for debugging

## 🛠️ Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Testing**: Jest
- **Package Manager**: npm

## 📁 Project Structure

```
src/
├── app.module.ts                 # Main application module
├── main.ts                      # Application bootstrap
├── common/                      # Shared utilities
│   ├── filters/                 # Global exception filters
│   ├── interceptors/            # Request/response interceptors
│   └── swagger/                 # API documentation setup
├── config/                      # Configuration management
│   ├── default.ts              # Default configuration
│   └── mongo/                  # MongoDB configuration
├── modules/                     # Feature modules
│   ├── auth/                   # Authentication module
│   ├── user/                   # User management
│   ├── products/               # Products management
│   ├── categories/             # Categories management
│   ├── blog/                   # Blog content management
│   ├── featured-boxes/         # Featured boxes management
│   ├── partners/               # Partners/sponsors management
│   └── base/                   # Base classes and utilities
└── shared/                     # Shared services
    └── logger/                 # Logging service
```

## 🏗️ Modules Overview

### 🔐 Auth Module
**Purpose**: Handle user authentication and authorization

**Features**:
- JWT token generation and validation
- User registration and login
- Password change and reset
- Role-based access control
- Token refresh mechanism

**Key Components**:
- `AuthController` - REST endpoints
- `AuthService` - Business logic
- `JwtStrategy` & `LocalStrategy` - Passport strategies
- `JwtAuthGuard`, `RolesGuard` - Route protection

### 👥 User Module
**Purpose**: Complete user management system

**Features**:
- User CRUD operations
- Business ID support for multi-tenancy
- Admin user management
- User search and filtering
- Profile management

**Key Components**:
- `UserController` - Admin-only endpoints
- `UserService` - Business logic
- `UserRepository` - Data access layer
- `UserRoles` - Role management schema

### 📦 Products Module
**Purpose**: Manage individual and box products

**Features**:
- Product CRUD operations
- Category-based organization
- Featured product management
- Stock management
- Product type classification (individual/box)

**Key Components**:
- `ProductsController` - REST endpoints
- `ProductsService` - Business logic
- `ProductsRepository` - Data access
- Category reference support

### 📂 Categories Module
**Purpose**: Hierarchical category management

**Features**:
- Parent-child category relationships
- Category CRUD operations
- Slug auto-generation
- Category validation (prevent deletion with subcategories)
- Category ordering

**Key Components**:
- `CategoriesController` - REST endpoints
- `CategoriesService` - Business logic
- `CategoriesRepository` - Data access
- Hierarchical query support

### 📝 Blog Module
**Purpose**: Content management for blog posts

**Features**:
- Blog post CRUD operations
- SEO optimization (meta tags)
- View and like counting
- Tag-based organization
- Featured and popular posts
- Author management

**Key Components**:
- `BlogController` - REST endpoints
- `BlogService` - Business logic
- `BlogRepository` - Data access
- SEO and analytics support

### 🎁 Featured Boxes Module
**Purpose**: Manage promotional featured boxes

**Features**:
- Featured box CRUD operations
- Category and tag filtering
- Order management
- Stock tracking
- Visual customization (colors, icons)

**Key Components**:
- `FeaturedBoxesController` - REST endpoints
- `FeaturedBoxesService` - Business logic
- `FeaturedBoxesRepository` - Data access
- Promotional content management

### 🤝 Partners Module
**Purpose**: Manage business partners and sponsorships

**Features**:
- Partner CRUD operations
- Sponsorship details management
- Representative information
- Package type classification
- Business relationship tracking

**Key Components**:
- `PartnersController` - REST endpoints
- `PartnersService` - Business logic
- `PartnersRepository` - Data access
- Sponsorship and representative schemas

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh-token     # Refresh access token
POST   /api/auth/change-password   # Change password
POST   /api/auth/forgot-password   # Request password reset
POST   /api/auth/reset-password    # Reset password
GET    /api/auth/profile           # Get user profile
GET    /api/auth/validate-token    # Validate token
```

### User Management (Admin Only)
```
POST   /api/users                  # Create user
GET    /api/users                  # Get all users
GET    /api/users/admins           # Get admin users
GET    /api/users/active           # Get active users
GET    /api/users/:id              # Get user by ID
PATCH  /api/users/:id              # Update user
DELETE /api/users/:id              # Delete user
```

### Products
```
POST   /api/products               # Create product
GET    /api/products               # Get all products
GET    /api/products/featured      # Get featured products
GET    /api/products/category/:category # Get by category
GET    /api/products/type/:type    # Get by product type
GET    /api/products/:id           # Get product by ID
PATCH  /api/products/:id           # Update product
DELETE /api/products/:id           # Delete product
```

### Categories
```
POST   /api/categories             # Create category
GET    /api/categories             # Get all categories
GET    /api/categories/root        # Get root categories
GET    /api/categories/:id/sub     # Get subcategories
GET    /api/categories/slug/:slug  # Get by slug
GET    /api/categories/:id         # Get category by ID
PATCH  /api/categories/:id         # Update category
DELETE /api/categories/:id         # Delete category
```

### Blog
```
POST   /api/blog                   # Create blog post
GET    /api/blog                   # Get all posts
GET    /api/blog/featured          # Get featured posts
GET    /api/blog/popular           # Get popular posts
GET    /api/blog/category/:category # Get by category
GET    /api/blog/author/:author    # Get by author
POST   /api/blog/tags              # Get by tags
GET    /api/blog/:id/like          # Like post
GET    /api/blog/:id               # Get post by ID
PATCH  /api/blog/:id               # Update post
DELETE /api/blog/:id               # Delete post
```

### Featured Boxes
```
POST   /api/featured-boxes         # Create featured box
GET    /api/featured-boxes         # Get all boxes
GET    /api/featured-boxes/featured # Get featured boxes
GET    /api/featured-boxes/active  # Get active boxes
GET    /api/featured-boxes/category/:category # Get by category
POST   /api/featured-boxes/tags    # Get by tags
GET    /api/featured-boxes/:id     # Get box by ID
PATCH  /api/featured-boxes/:id     # Update box
DELETE /api/featured-boxes/:id     # Delete box
```

### Partners
```
POST   /api/partners               # Create partner
GET    /api/partners               # Get all partners
GET    /api/partners/package/:type # Get by package type
GET    /api/partners/:id           # Get partner by ID
PATCH  /api/partners/:id           # Update partner
DELETE /api/partners/:id           # Delete partner
```

### Documentation
```
GET    /api/docs                   # Swagger documentation
```

## 🚀 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB 5+
- npm or yarn

### Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd skylarbox-api

# Install dependencies
npm install

# Build the project
npm run build
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGO_HOST=mongodb://localhost:27017/skylarbox
MONGO_OPTIONS_USER=
MONGO_OPTIONS_PASS=

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=3600s

# Logging Configuration
LOG_CONSOLE=enabled
LOG_CONSOLE_LEVEL=info
LOG_ROTATE_FILE=enabled
LOG_ROTATE_FILE_LEVEL=debug
LOG_ROTATE_FILE_NAME=logs/app.log
LOG_ROTATE_FILE_MAX_SIZE=25000000
LOG_ROTATE_FILE_MAX_DAYS=15

# Optional: S3 Configuration (for file uploads)
S3_BUCKET=your-bucket-name
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=your-region
S3_SERVER_NAME=your-s3-server
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start in development mode with hot reload
npm run dev

# Or start in debug mode
npm run debug
```

### Production Mode
```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Docker (Optional)
```bash
# Build Docker image
docker build -t skylarbox-api .

# Run with Docker Compose
docker-compose up -d
```

## 🗄️ Database Schema

### Users Collection
```typescript
{
  business_id: string,           // Required
  email: string,                 // Optional
  phone: string,                 // Optional
  user_name: string,             // Required
  first_name: string,            // Optional
  last_name: string,             // Optional
  password: string,              // Required (hashed)
  address: string,               // Optional
  is_admin: boolean,             // Default: false
  is_active: boolean,            // Default: true
  is_delete: boolean,            // Default: false
  // ... additional profile fields
}
```

### Products Collection
```typescript
{
  name: string,                  // Required
  price: string,                 // Required
  category: string,              // Required
  categoryId: ObjectId,          // Optional reference
  giftImage: string,             // Required
  productImage: string,          // Required
  giftIcon: string,              // Required
  description: string,           // Optional
  stock: number,                 // Default: 0
  isActive: boolean,             // Default: true
  isFeatured: boolean,           // Default: false
  productType: string,           // 'individual' | 'box'
}
```

### Categories Collection
```typescript
{
  name: string,                  // Required, unique
  description: string,           // Optional
  image: string,                 // Optional
  parentId: string,              // Optional (for hierarchy)
  order: number,                 // Default: 0
  isActive: boolean,             // Default: true
  slug: string,                  // Auto-generated
  color: string,                 // Optional
  icon: string,                  // Optional
}
```

### Blog Collection
```typescript
{
  title: string,                 // Required
  excerpt: string,               // Required
  content: string,               // Required
  slug: string,                  // Auto-generated
  author: string,                // Optional
  featuredImage: string,         // Optional
  tags: string[],                // Optional
  category: string,              // Optional
  publishedDate: Date,           // Default: now
  isPublished: boolean,          // Default: true
  isFeatured: boolean,           // Default: false
  viewCount: number,             // Default: 0
  likeCount: number,             // Default: 0
  // SEO fields
  metaTitle: string,             // Optional
  metaDescription: string,       // Optional
  metaKeywords: string[],        // Optional
}
```

## 🔐 Authentication

### JWT Token Structure
```typescript
{
  sub: string,                   // User ID
  email: string,                 // User email
  user_name: string,             // Username
  is_admin: boolean,             // Admin status
  iat: number,                   // Issued at
  exp: number                    // Expiration time
}
```

### Role-Based Access Control
- **Admin**: Full access to all endpoints
- **User**: Limited access to public endpoints
- **Moderator**: Intermediate access level

### Protected Routes
Use the following decorators to protect routes:
```typescript
@UseGuards(JwtAuthGuard)         // Require authentication
@UseGuards(RolesGuard)           // Require specific roles
@Roles(Role.Admin)               // Require admin role
@Public()                        // Make route public
```

## 🛠️ Development

### Available Scripts
```bash
npm run build                    # Build the application
npm run start                    # Start the application
npm run dev                      # Start with hot reload
npm run debug                    # Start in debug mode
npm run test                     # Run unit tests
npm run test:e2e                 # Run e2e tests
npm run test:cov                 # Run tests with coverage
npm run lint                     # Run ESLint
npm run format                   # Format code with Prettier
```

### Code Style
- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting
- **Import Order**: Organized imports with path aliases

### Path Aliases
```typescript
@modules/*     → src/modules/*
@shared/*      → src/shared/*
@common/*      → src/common/*
@config/*      → src/config/*
@utils/*       → src/utils/*
@constants/*   → src/constants/*
@guards/*      → src/guards/*
@libs/*        → src/libs/*
```

### Testing
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 API Documentation

Once the application is running, visit:
- **Swagger UI**: `http://localhost:3000/api/docs`
- **Health Check**: `http://localhost:3000/api/health`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation at `/api/docs`

---

**🎉 Happy Coding!** 🚀
