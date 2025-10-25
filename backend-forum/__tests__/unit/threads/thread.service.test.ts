import { PrismaClient } from '@prisma/client';
import { createThread, getAllThreads, getThreadById, updateThread, deleteThread } from '../../../src/app/services/threads/thread.service';
import { createTestUsers, createTestThreads, testData } from '../../fixtures/test-data';

const prisma = new PrismaClient();

describe('Thread Service', () => {
  let testUsers: any[];
  let testThreads: any[];

  beforeAll(async () => {
    testUsers = await createTestUsers(prisma);
    testThreads = await createTestThreads(prisma, testUsers);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('createThread', () => {
    it('should create a new thread successfully', async () => {
      const threadData = {
        ...testData.validThread,
        userId: testUsers[0].id,
      };

      const result = await createThread(threadData);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe(testData.validThread.title);
      expect(result.content).toBe(testData.validThread.content);
      expect(result.authorId).toBe(testUsers[0].id);
    });
  });

  describe('getAllThreads', () => {
    it('should return paginated threads', async () => {
      const result = await getAllThreads(1, 10);

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('pagination');
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.pagination).toHaveProperty('page');
      expect(result.pagination).toHaveProperty('limit');
      expect(result.pagination).toHaveProperty('total');
    });

    it('should handle pagination parameters', async () => {
      const result = await getAllThreads(1, 2);

      expect(result.data.length).toBeLessThanOrEqual(2);
      expect(result.pagination.limit).toBe(2);
    });

    it('should default to page 1 for invalid page', async () => {
      const result = await getAllThreads(0, 10);

      expect(result.pagination.page).toBe(1);
    });

    it('should default to limit 10 for invalid limit', async () => {
      const result = await getAllThreads(1, 0);

      expect(result.pagination.limit).toBe(10);
    });
  });

  describe('getThreadById', () => {
    it('should return thread by id', async () => {
      const thread = testThreads[0];
      const result = await getThreadById(thread.id);

      expect(result.id).toBe(thread.id);
      expect(result.title).toBe(thread.title);
      expect(result.content).toBe(thread.content);
    });

    it('should throw error for non-existent thread', async () => {
      await expect(getThreadById('nonexistent-id')).rejects.toThrow('Thread tidak ditemukan');
    });
  });

  describe('updateThread', () => {
    it('should update thread successfully', async () => {
      const thread = testThreads[0];
      const updateData = {
        title: 'Updated Thread Title',
        content: 'Updated thread content',
      };

      const result = await updateThread(thread.id, thread.authorId, updateData);

      expect(result.title).toBe(updateData.title);
      expect(result.content).toBe(updateData.content);
    });

    it('should throw error when user is not owner', async () => {
      const thread = testThreads[0];
      const updateData = { title: 'New Title' };

      await expect(updateThread(thread.id, testUsers[1].id, updateData))
        .rejects.toThrow('Anda tidak memiliki izin untuk mengubah thread ini');
    });

    it('should throw error for non-existent thread', async () => {
      const updateData = { title: 'New Title' };

      await expect(updateThread('nonexistent-id', testUsers[0].id, updateData))
        .rejects.toThrow('Thread tidak ditemukan');
    });

    it('should throw error when no fields provided', async () => {
      const thread = testThreads[0];

      await expect(updateThread(thread.id, thread.authorId, {}))
        .rejects.toThrow('Minimal satu field harus diisi untuk update');
    });
  });

  describe('deleteThread', () => {
    it('should delete thread successfully', async () => {
      const thread = testThreads[0];

      const result = await deleteThread(thread.id, thread.authorId);

      expect(result.message).toBe('Thread berhasil dihapus');

      // Verify thread is deleted
      await expect(getThreadById(thread.id)).rejects.toThrow('Thread tidak ditemukan');
    });

    it('should throw error when user is not owner', async () => {
      const thread = testThreads[1];

      await expect(deleteThread(thread.id, testUsers[2].id))
        .rejects.toThrow('Anda tidak memiliki izin untuk menghapus thread ini');
    });

    it('should throw error for non-existent thread', async () => {
      await expect(deleteThread('nonexistent-id', testUsers[0].id))
        .rejects.toThrow('Thread tidak ditemukan');
    });
  });
});