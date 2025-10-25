import axios from 'axios';
import { getSession } from 'next-auth/react'; // <-- Impor getSession

// 1. Buat instance Axios dasar
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Buat Request Interceptor
// Ini akan berjalan SEBELUM setiap request dikirim
apiClient.interceptors.request.use(
  async (config) => {
    // 3. Dapatkan sesi dari Next-Auth
    // Kita pakai getSession() BUKAN useSession()
    // karena ini bukan React Component (bukan hook).
    const session = await getSession();

    if (session?.backendToken) {
      // 4. Jika token ada, tambahkan ke header
      config.headers.Authorization = `Bearer ${session.backendToken}`;
    }
    
    // 5. Kembalikan config yang sudah dimodifikasi
    return config;
  },
  (error) => {
    // Tangani error jika terjadi saat setup interceptor
    return Promise.reject(error);
  }
);

export default apiClient;