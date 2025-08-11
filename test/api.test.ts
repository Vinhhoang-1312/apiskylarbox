import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../src/modules/user/schemas/users.schema';
import { Partners, PartnersDocument } from '../src/modules/partners/schemas/partners.schema';
import { Products, ProductsDocument } from '../src/modules/products/schemas/products.schema';
import { Categories, CategoriesDocument } from '../src/modules/categories/schemas/categories.schema';
import { FeaturedBoxes, FeaturedBoxesDocument } from '../src/modules/featured-boxes/schemas/featured-boxes.schema';
import { Blog, BlogDocument } from '../src/modules/blog/schemas/blog.schema';
import { Testimonials, TestimonialsDocument } from '../src/modules/testimonials/schemas/testimonials.schema';

describe('Skylarbox API Tests', () => {
  let app: INestApplication;
  let mongoMemoryServer: MongoMemoryServer;
  let mongoConnection: Connection;
  let usersModel: Model<UsersDocument>;
  let partnersModel: Model<PartnersDocument>;
  let productsModel: Model<ProductsDocument>;
  let categoriesModel: Model<CategoriesDocument>;
  let featuredBoxesModel: Model<FeaturedBoxesDocument>;
  let blogModel: Model<BlogDocument>;
  let testimonialsModel: Model<TestimonialsDocument>;
  let authToken: string;

  beforeAll(async () => {
    // Start MongoDB Memory Server
    mongoMemoryServer = await MongoMemoryServer.create();
    const mongoUri = mongoMemoryServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('MONGO_URI')
      .useValue(mongoUri)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Get models
    usersModel = moduleFixture.get<Model<UsersDocument>>(getModelToken(Users.name));
    partnersModel = moduleFixture.get<Model<PartnersDocument>>(getModelToken(Partners.name));
    productsModel = moduleFixture.get<Model<ProductsDocument>>(getModelToken(Products.name));
    categoriesModel = moduleFixture.get<Model<CategoriesDocument>>(getModelToken(Categories.name));
    featuredBoxesModel = moduleFixture.get<Model<FeaturedBoxesDocument>>(getModelToken(FeaturedBoxes.name));
    blogModel = moduleFixture.get<Model<BlogDocument>>(getModelToken(Blog.name));
    testimonialsModel = moduleFixture.get<Model<TestimonialsDocument>>(getModelToken(Testimonials.name));

    // Connect to MongoDB
    // mongoConnection = await connect(mongoUri);
  });

  afterAll(async () => {
    await app.close();
    await mongoConnection.close();
    await mongoMemoryServer.stop();
  });

  beforeEach(async () => {
    // Clear all collections before each test
    await usersModel.deleteMany({});
    await partnersModel.deleteMany({});
    await productsModel.deleteMany({});
    await categoriesModel.deleteMany({});
    await featuredBoxesModel.deleteMany({});
    await blogModel.deleteMany({});
    await testimonialsModel.deleteMany({});
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      const registerData = {
        business_id: 'test-business',
        user_name: 'testuser',
        password: 'password123',
        email: 'test@example.com',
        phone: '0123456789',
        first_name: 'Test',
        last_name: 'User',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send(registerData)
        .expect(201);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.user_name).toBe(registerData.user_name);
      expect(response.body.user.email).toBe(registerData.email);
    });

    it('should login user', async () => {
      // First register a user
      const registerData = {
        business_id: 'test-business',
        user_name: 'testuser',
        password: 'password123',
        email: 'test@example.com',
      };

      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send(registerData);

      // Then login
      const loginData = {
        username: 'testuser',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      authToken = response.body.token;
    });
  });

  describe('Categories API', () => {
    it('should create a category', async () => {
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description',
        icon: '🎁',
        color: '#FF5733',
        sort_order: 1,
        is_active: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData)
        .expect(201);

      expect(response.body.name).toBe(categoryData.name);
      expect(response.body.description).toBe(categoryData.description);
    });

    it('should get all categories (public)', async () => {
      // Create a category first
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description',
      };

      await request(app.getHttpServer())
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData);

      const response = await request(app.getHttpServer())
        .get('/api/categories')
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(response.body).toHaveProperty('total');
      expect(response.body.list.length).toBeGreaterThan(0);
    });

    it('should get category by id (public)', async () => {
      // Create a category first
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData);

      const categoryId = createResponse.body._id;

      const response = await request(app.getHttpServer())
        .get(`/api/categories/${categoryId}`)
        .expect(200);

      expect(response.body.name).toBe(categoryData.name);
    });

    it('should update a category', async () => {
      // Create a category first
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData);

      const categoryId = createResponse.body._id;

      const updateData = {
        name: 'Updated Category',
        description: 'Updated Description',
      };

      const response = await request(app.getHttpServer())
        .patch(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe(updateData.name);
      expect(response.body.description).toBe(updateData.description);
    });

    it('should delete a category (soft delete)', async () => {
      // Create a category first
      const categoryData = {
        name: 'Test Category',
        description: 'Test Description',
      };

      const createResponse = await request(app.getHttpServer())
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(categoryData);

      const categoryId = createResponse.body._id;

      const response = await request(app.getHttpServer())
        .delete(`/api/categories/${categoryId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.is_delete).toBe(true);
    });
  });

  describe('Products API', () => {
    it('should create a product', async () => {
      const productData = {
        name: 'Test Product',
        price: '299.000đ',
        category: 'Test Category',
        giftImage: '/images/test-gift.png',
        productImage: '/images/test-product.png',
        giftIcon: '🎁',
        description: 'Test product description',
        sort_order: 1,
        is_active: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.name).toBe(productData.name);
      expect(response.body.price).toBe(productData.price);
      expect(response.body.category).toBe(productData.category);
    });

    it('should get all products (public)', async () => {
      // Create a product first
      const productData = {
        name: 'Test Product',
        price: '299.000đ',
        category: 'Test Category',
      };

      await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData);

      const response = await request(app.getHttpServer())
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(response.body).toHaveProperty('total');
      expect(response.body.list.length).toBeGreaterThan(0);
    });

    it('should search products by name', async () => {
      // Create products first
      const productData1 = {
        name: 'Test Product 1',
        price: '299.000đ',
        category: 'Test Category',
      };

      const productData2 = {
        name: 'Another Product',
        price: '399.000đ',
        category: 'Test Category',
      };

      await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData1);

      await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${authToken}`)
        .send(productData2);

      const response = await request(app.getHttpServer())
        .get('/api/products?search=Test')
        .expect(200);

      expect(response.body.list.length).toBe(1);
      expect(response.body.list[0].name).toBe('Test Product 1');
    });
  });

  describe('Partners API', () => {
    it('should create a partner', async () => {
      const partnerData = {
        id: 1,
        companyName: 'Test Company',
        shortName: 'Test Co',
        website: 'https://test.com',
        fanpage: 'https://facebook.com/test',
        sponsorship: {
          type: 'Tiền mặt',
          amount: 5000000,
          detail: '5.000.000',
        },
        package: 'bronze',
        logo: '/images/test-logo.png',
        representative: {
          title: 'Ông',
          name: 'Test Representative',
          position: 'Giám đốc',
          dob: '01/01/1980',
          facebook: 'https://facebook.com/testrep',
          email: 'test@company.com',
          phone: '0123456789',
        },
        is_active: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/partners')
        .set('Authorization', `Bearer ${authToken}`)
        .send(partnerData)
        .expect(201);

      expect(response.body.companyName).toBe(partnerData.companyName);
      expect(response.body.sponsorship.amount).toBe(partnerData.sponsorship.amount);
    });

    it('should get all partners (public)', async () => {
      // Create a partner first
      const partnerData = {
        id: 1,
        companyName: 'Test Company',
        shortName: 'Test Co',
        sponsorship: {
          type: 'Tiền mặt',
          amount: 5000000,
          detail: '5.000.000',
        },
        representative: {
          title: 'Ông',
          name: 'Test Representative',
          position: 'Giám đốc',
          dob: '01/01/1980',
          facebook: 'https://facebook.com/testrep',
          email: 'test@company.com',
          phone: '0123456789',
        },
      };

      await request(app.getHttpServer())
        .post('/api/partners')
        .set('Authorization', `Bearer ${authToken}`)
        .send(partnerData);

      const response = await request(app.getHttpServer())
        .get('/api/partners')
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(response.body).toHaveProperty('total');
      expect(response.body.list.length).toBeGreaterThan(0);
    });
  });

  describe('Featured Boxes API', () => {
    it('should create a featured box', async () => {
      const featuredBoxData = {
        name: 'Test Featured Box',
        description: 'Test description for featured box',
        price: '599.000đ',
        color: 'bg-gradient-to-br from-brand-rose/20 to-brand-rose/40',
        giftImage: '/images/box/demo.png',
        productImage: '/images/box/box_1.png',
        giftIcon: '✨',
        sort_order: 1,
        is_active: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/featured-boxes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(featuredBoxData)
        .expect(201);

      expect(response.body.name).toBe(featuredBoxData.name);
      expect(response.body.price).toBe(featuredBoxData.price);
    });

    it('should get all featured boxes (public)', async () => {
      // Create a featured box first
      const featuredBoxData = {
        name: 'Test Featured Box',
        description: 'Test description for featured box',
        price: '599.000đ',
      };

      await request(app.getHttpServer())
        .post('/api/featured-boxes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(featuredBoxData);

      const response = await request(app.getHttpServer())
        .get('/api/featured-boxes')
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(response.body).toHaveProperty('total');
      expect(response.body.list.length).toBeGreaterThan(0);
    });
  });

  describe('Blog API', () => {
    it('should create a blog post', async () => {
      const blogData = {
        title: 'Test Blog Post',
        excerpt: 'Test excerpt for blog post',
        date: '15/12/2024',
        content: 'Test content for blog post',
        author: 'Test Author',
        image: '/images/blog/test.jpg',
        tags: ['test', 'blog'],
        sort_order: 1,
        is_active: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData)
        .expect(201);

      expect(response.body.title).toBe(blogData.title);
      expect(response.body.excerpt).toBe(blogData.excerpt);
    });

    it('should get all blog posts (public)', async () => {
      // Create a blog post first
      const blogData = {
        title: 'Test Blog Post',
        excerpt: 'Test excerpt for blog post',
        date: '15/12/2024',
      };

      await request(app.getHttpServer())
        .post('/api/blog')
        .set('Authorization', `Bearer ${authToken}`)
        .send(blogData);

      const response = await request(app.getHttpServer())
        .get('/api/blog')
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(response.body).toHaveProperty('total');
      expect(response.body.list.length).toBeGreaterThan(0);
    });
  });

  describe('Testimonials API', () => {
    it('should create a testimonial', async () => {
      const testimonialData = {
        name: 'Test Customer',
        content: 'Great service and amazing products!',
        rating: 5,
        avatar: '/images/avatar/test.jpg',
        position: 'Customer',
        company: 'Test Company',
        sort_order: 1,
        is_active: true,
      };

      const response = await request(app.getHttpServer())
        .post('/api/testimonials')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testimonialData)
        .expect(201);

      expect(response.body.name).toBe(testimonialData.name);
      expect(response.body.rating).toBe(testimonialData.rating);
    });

    it('should get all testimonials (public)', async () => {
      // Create a testimonial first
      const testimonialData = {
        name: 'Test Customer',
        content: 'Great service and amazing products!',
        rating: 5,
      };

      await request(app.getHttpServer())
        .post('/api/testimonials')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testimonialData);

      const response = await request(app.getHttpServer())
        .get('/api/testimonials')
        .expect(200);

      expect(response.body).toHaveProperty('list');
      expect(response.body).toHaveProperty('total');
      expect(response.body.list.length).toBeGreaterThan(0);
    });
  });

  describe('Pagination and Search', () => {
    it('should support pagination', async () => {
      // Create multiple items
      for (let i = 1; i <= 15; i++) {
        const categoryData = {
          name: `Category ${i}`,
          description: `Description ${i}`,
        };

        await request(app.getHttpServer())
          .post('/api/categories')
          .set('Authorization', `Bearer ${authToken}`)
          .send(categoryData);
      }

      const response = await request(app.getHttpServer())
        .get('/api/categories?page=1&limit=10')
        .expect(200);

      expect(response.body.list.length).toBe(10);
      expect(response.body.total).toBe(15);
      expect(response.body.page).toBe(1);
      expect(response.body.limit).toBe(10);
      expect(response.body.totalPages).toBe(2);
    });

    it('should support search functionality', async () => {
      // Create items with different names
      const items = [
        { name: 'Apple Product', description: 'Test' },
        { name: 'Banana Product', description: 'Test' },
        { name: 'Orange Product', description: 'Test' },
      ];

      for (const item of items) {
        await request(app.getHttpServer())
          .post('/api/categories')
          .set('Authorization', `Bearer ${authToken}`)
          .send(item);
      }

      const response = await request(app.getHttpServer())
        .get('/api/categories?search=Apple')
        .expect(200);

      expect(response.body.list.length).toBe(1);
      expect(response.body.list[0].name).toBe('Apple Product');
    });
  });

  describe('Error Handling', () => {
    it('should return 401 for protected routes without token', async () => {
      await request(app.getHttpServer())
        .post('/api/categories')
        .send({ name: 'Test' })
        .expect(401);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        // Missing required fields
      };

      await request(app.getHttpServer())
        .post('/api/categories')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);
    });

    it('should return 404 for non-existent resource', async () => {
      const fakeId = '507f1f77bcf86cd799439011'; // Valid ObjectId format but doesn't exist

      await request(app.getHttpServer())
        .get(`/api/categories/${fakeId}`)
        .expect(404);
    });
  });
});

