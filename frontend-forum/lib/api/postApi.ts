import apiClient from '@/lib/apiClient'; // Impor Axios interceptor Anda
import type { Post } from '@/types'; // Import types yang sudah dibuat

/**
 * POST API FUNCTIONS
 */

/**
 * FUNGSI 1: Mengambil SEMUA post untuk satu thread
 * @param threadId - ID thread
 */
export const fetchPostsByThreadId = async (threadId: string): Promise<Post[]> => {
  const response = await apiClient.get(`/posts/thread/${threadId}`);
  // Handle different response formats - API returns {data: {posts: [...], pagination: {...}}}
  const apiData = response.data.data || response.data;
  const posts = apiData.posts || apiData || [];
  return Array.isArray(posts) ? posts : [];
};

/**
 * FUNGSI 2: Membuat post baru
 * @param threadId - ID thread tempat post akan dibuat
 * @param postData - Data post yang akan dibuat
 */
export const createPost = async (
  threadId: string,
  postData: { content: string }
): Promise<Post> => {
  const response = await apiClient.post('/posts', {
    threadId,
    content: postData.content
  });
  // Handle different response formats - API returns {data: {post: {...}}}
  const apiData = response.data.data || response.data;
  return apiData.post || apiData;
};

/**
 * FUNGSI 3: Update post
 * @param postId - ID post yang akan diupdate
 * @param postData - Data post yang akan diupdate
 */
export const updatePost = async (
  postId: string,
  postData: { content: string }
): Promise<Post> => {
  const response = await apiClient.put(`/posts/${postId}`, postData);
  // Handle different response formats - API returns {data: {post: {...}}}
  const apiData = response.data.data || response.data;
  return apiData.post || apiData;
};

/**
 * FUNGSI 4: Hapus post
 * @param postId - ID post yang akan dihapus
 */
export const deletePost = async (postId: string): Promise<void> => {
  await apiClient.delete(`/posts/${postId}`);
};