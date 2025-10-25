import apiClient from '@/lib/apiClient'; // Impor Axios interceptor Anda
import type { Thread, Post, User, ThreadWithPosts } from '@/types'; // Import types yang sudah dibuat

//------------------------------------

/**
 * THREAD API FUNCTIONS
 */

/**
 * FUNGSI 1: Mengambil SEMUA threads
 */
export const fetchThreads = async (): Promise<Thread[]> => {
  // Interceptor di apiClient akan otomatis menambahkan token
  const response = await apiClient.get('/threads');
  // Handle different response formats - API returns {data: {threads: [...], pagination: {...}}}
  const apiData = response.data.data || response.data;
  const threads = apiData.threads || apiData || [];
  return Array.isArray(threads) ? threads : [];
};

/**
 * FUNGSI 2: Mengambil SATU thread detail (termasuk post-nya)
 * @param threadId - ID dari thread yang akan diambil
 */
export const fetchThreadById = async (threadId: string): Promise<ThreadWithPosts> => {
  const response = await apiClient.get(`/threads/${threadId}`);
  // Handle different response formats - API returns {data: {thread: {...}}} or {data: {...}}
  const apiData = response.data.data || response.data;
  // If apiData has a 'thread' property, return it; otherwise return apiData directly
  return apiData.thread || apiData;
};

/**
 * FUNGSI 3: Membuat thread baru
 * @param threadData - Data thread yang akan dibuat
 */
export const createThread = async (threadData: { title: string; content: string }): Promise<Thread> => {
  const response = await apiClient.post('/threads', threadData);
  // Handle different response formats - API returns {data: {...}} or {...}
  return response.data.data || response.data;
};

/**
 * FUNGSI 4: Update thread
 * @param threadId - ID thread yang akan diupdate
 * @param threadData - Data thread yang akan diupdate
 */
export const updateThread = async (
  threadId: string,
  threadData: { title: string; content: string }
): Promise<Thread> => {
  const response = await apiClient.put(`/threads/${threadId}`, threadData);
  // Handle different response formats - API returns {data: {...}} or {...}
  return response.data.data || response.data;
};

/**
 * FUNGSI 5: Hapus thread
 * @param threadId - ID thread yang akan dihapus
 */
export const deleteThread = async (threadId: string): Promise<void> => {
  await apiClient.delete(`/threads/${threadId}`);
};


