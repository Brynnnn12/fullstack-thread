import { PrismaClient } from '@prisma/client';
import { register, login, getProfile } from '../../../src/app/services/auth/auth.service';
import { createTestUsers, testData } from '../../fixtures/test-data';

const prisma = new PrismaClient();

describe('Auth Service', () => {
  let testUsers: any[];

  beforeAll(async () => {
    testUsers = await createTestUsers(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const result = await register(testData.validUser);

      expect(result).toHaveProperty('id');
      expect(result.username).toBe(testData.validUser.username);
      expect(result.email).toBe(testData.validUser.email);
      expect(result).not.toHaveProperty('password');
    });

    it('should throw error for duplicate email', async () => {
      await expect(register({
        ...testData.validUser,
        username: 'differentuser',
      })).rejects.toThrow('Email sudah terdaftar');
    });
  });

  describe('login', () => {
    it('should login user with correct credentials', async () => {
      const token = await login({
        email: testData.validUser.email,
        password: testData.validUser.password,
      });

      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should throw error for non-existent user', async () => {
      await expect(login({
        email: 'nonexistent@example.com',
        password: 'password123',
      })).rejects.toThrow('Email atau password salah');
    });

    it('should throw error for wrong password', async () => {
      await expect(login({
        email: testData.validUser.email,
        password: 'wrongpassword',
      })).rejects.toThrow('Email atau password salah');
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const user = testUsers[0];
      const profile = await getProfile(user.id);

      expect(profile.id).toBe(user.id);
      expect(profile.username).toBe(user.username);
      expect(profile.email).toBe(user.email);
    });

    it('should throw error for non-existent user', async () => {
      await expect(getProfile('nonexistent-id')).rejects.toThrow('User tidak ditemukan');
    });
  });
});