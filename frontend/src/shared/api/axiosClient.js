import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

// Interceptor cho Request
axiosClient.interceptors.request.use(
  (config) => {
    // Sửa lại thành 'access_token'
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// -- Cấu hình gửi request dạng FormData mà không có headers["Content-Type"] (up file)
axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  return config;
});

// Interceptor cho Response (Tùy chọn nâng cao)
axiosClient.interceptors.response.use(
  (response) => response.data, // Tự bọc data trả về
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu Token hết hạn hoặc không hợp lệ -> xóa token cũ
      localStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);