import { axiosClient } from "./axiosClient"
import { API_ENDPOINTS } from "./endpoints"

export const publicApi = {
    getCities: async () => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.CITIES);
    },

    getWardsByCity: async (city_id) => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.WARDS_BYCITY_ID(city_id));
    },

    getWardById: async (ward_id) => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.WARD_BY_ID(ward_id));
    },

    // -- Lấy danh sách ảnh của khách sạn
    getListImageHotel: async (hotel_id, data) => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.HOTEL.IMAGES(hotel_id), data);
    }
}