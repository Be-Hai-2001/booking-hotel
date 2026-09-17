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

  // Partner
  PARTNER: {
    HOTEL: {
      LIST: '/partner/hotels',                 // GET: Lấy danh sách khách sạn của partner
      CREATE: '/partner/hotels',               // POST: Tạo mới khách sạn
      DETAIL: (id) => `/partner/hotels/${id}`, // GET: Xem chi tiết
      UPDATE: (id) => `/partner/hotels/${id}`, // PUT/PATCH: Cập nhật
      DELETE: (id) => `/partner/hotels/${id}`, // DELETE: Xóa khách sạn
    }
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