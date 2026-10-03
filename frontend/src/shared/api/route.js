// Thực hiện navigate theo url

export const ROUTE = {
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
            LIST: '/partner/hotels',
            CREATE: '/partner/hotels/create',
            INFO: (id) => `/partner/hotel/detail/${id}`,
            EDIT: (id) => `/partner/hotel/edit/${id}`,
            DELETE: (id) => `/partner/hotel/${id}`,
        },

        DASHBOARD: '/partner/dashboard',

    },

    // Admin
    ADMIN: {

        DASHBOARD: {
            STATS: '/admin/dashboard',
        },
    },
};