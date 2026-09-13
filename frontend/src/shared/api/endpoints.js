// UI admin/dashboard
export const API_ENDPOINTS = {
  DASHBOARD: {
    STATS: '/dashboard/stats',
  },

  // Đăng nhập - đăng xuất - đăng ký account
  AUTH: {
    LOGIN: '/auth/admin/login',
    ME: '/auth/me'
  },

  // hotel
  HOTELS: {
    BASE: '/hotels',
    GET_ALL: '/hotels',
    MY_HOTELS: '/my-hotel',
    CREATE: '/hotels',
    DETAIL: (id) => `/hotels/${id}`,
  }
};