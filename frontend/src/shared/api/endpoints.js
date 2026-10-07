// UI admin/dashboard
export const API_ENDPOINTS = {
    DASHBOARD: {
        STATS: '/dashboard/stats',
    },

    PUBLIC: {
        CITIES: '/location/cities',
        WARDS_BYCITY_ID: (city_id) => `/location/wards/city/${city_id}`,
        WARD_BY_ID: (ward_id) => `location/wards/${ward_id}`,

        HOTEL: {
            DETAIL: (hotel_id) => `hotels/${hotel_id}`,
            IMAGES: (hotel_id) => `hotels/${hotel_id}/images`
        }
    },

    // Partner
    PARTNER: {
        // Đăng nhập - đăng xuất - đăng ký account
        AUTH: {
            LOGIN: '/partner/login',
            ME: '/partner/me'
        },

        HOTEL: {
            LIST: '/partner/hotels',                    // GET: Lấy danh sách khách sạn của partner
            CREATE: '/partner/hotels',                   // POST: Tạo mới khách sạn
            UPDATE: (id) => `/partner/hotels/${id}`,    // PUT/PATCH: Cập nhật
            DELETE: (id) => `/partner/hotels/${id}`,    // DELETE: Xóa khách sạn
        },

        IMAGES: {
            CREATE_LIST: (hotel_id) => `partner/hotels/${hotel_id}/images`,
            DELETE_LIST: 'partner/hotels/images'

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