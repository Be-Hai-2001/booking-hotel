// UI admin/dashboard
export const API_ENDPOINTS = {
    DASHBOARD: {
        STATS: '/dashboard/stats',
    },

    PUBLIC: {
        CITIES: '/location/cities',
        WARDS_BYCITY_ID: (city_id) => `/location/wards/${city_id}`
    },

    // Partner
    PARTNER: {
        // Đăng nhập - đăng xuất - đăng ký account
        AUTH: {
            LOGIN: '/partner/login',
            ME: '/partner/me'
        },

        HOTEL: {
            LIST: '/partner/hotels',                // GET: Lấy danh sách khách sạn của partner
            CREATE: '/partner/hotel',               // POST: Tạo mới khách sạn
            DETAIL: (id) => `/partner/hotel/${id}`, // GET: Xem chi tiết
            UPDATE: (id) => `/partner/hotel/${id}`, // PUT/PATCH: Cập nhật
            DELETE: (id) => `/partner/hotel/${id}`, // DELETE: Xóa khách sạn
        },

        DASHBOARD: '/partner/dashboard',

    },

    // Admin
    ADMIN: {

        DASHBOARD: {
            STATS: '/admin/dashboard',
        },
    },

    // hotel
    // HOTELS: {
    //     BASE: '/hotels',
    //     GET_ALL: '/hotels',
    //     MY_HOTELS: '/my-hotel',
    //     CREATE: '/hotels',
    //     DETAIL: (id) => `/hotels/${id}`,
    // }

};