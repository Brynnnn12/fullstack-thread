import request from 'supertest';
import { setupTestEnvironment, teardownTestEnvironment, TestContext } from '../../setup/test-helpers';
import { testData } from '../../fixtures/test-data';

describe('Auth API Integration Tests', () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await setupTestEnvironment();
  });

  afterAll(async () => {
    await teardownTestEnvironment(context);
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(context.baseUrl)
        .post('/auth/register')
        .send(testData.validUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(testData.validUser.username);
      expect(response.body.email).toBe(testData.validUser.email);
      expect(response.body).not.toHaveProperty('password');
    });

    it('should return 400 for duplicate email', async () => {
      // First register a user
      await request(context.baseUrl)
        .post('/auth/register')
        .send(testData.validUser);

      // Try to register again with same email
      const response = await request(context.baseUrl)
        .post('/auth/register')
        .send({
          ...testData.validUser,
          username: 'differentuser',
        })
        .expect(400);

      expect(response.body.message).toContain('Email sudah terdaftar');
    });

    it('should return 400 for invalid data', async () => {
      const response = await request(context.baseUrl)
        .post('/auth/register')
        .send(testData.invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('POST /auth/login', () => {
    beforeAll(async () => {
      // Register a user for login tests
      await request(context.baseUrl)
        .post('/auth/register')
        .send(testData.validUser);
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(context.baseUrl)
        .post('/auth/login')
        .send({
          email: testData.validUser.email,
          password: testData.validUser.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    it('should return 401 for wrong password', async () => {
      const response = await request(context.baseUrl)
        .post('/auth/login')
        .send({
          email: testData.validUser.email,
          password: 'wrongpassword',
        })
        .expect(401);

      expect(response.body.message).toContain('Email atau password salah');
    });

    it('should return 401 for non-existent user', async () => {
      const response = await request(context.baseUrl)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123',
        })
        .expect(401);

      expect(response.body.message).toContain('Email atau password salah');
    });
  });

  describe('GET /auth/profile', () => {
    let authToken: string;

    beforeAll(async () => {
      // Register and login to get token
      await request(context.baseUrl)
        .post('/auth/register')
        .send(testData.validUser);

      const loginResponse = await request(context.baseUrl)
        .post('/auth/login')
        .send({
          email: testData.validUser.email,
          password: testData.validUser.password,
        });

      authToken = loginResponse.body.token;
    });

    it('should return user profile with valid token', async () => {
      const response = await request(context.baseUrl)
        .get('/auth/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id');
      expect(response.body.username).toBe(testData.validUser.username);
      expect(response.body.email).toBe(testData.validUser.email);
    });

    it('should return 401 without token', async () => {
      await request(context.baseUrl)
        .get('/auth/profile')
        .expect(401);
    });

    it('should return 401 with invalid token', async () => {
      await request(context.baseUrl)
        .get('/auth/profile')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});