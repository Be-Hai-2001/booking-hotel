import axios from 'axios';

// Cấu hình đường dẫn gốc (code mặc định)

export const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Đường dẫn gốc API Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // (Tùy chọn) Ngắt kết nối nếu request quá 10 giây
});

// Tự động đính kèm Token nếu có đăng nhập
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);