import { axiosClient } from "../../../shared/api/axiosClient";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";

export const hotelApi = {
    // Lấy toàn bộ danh sách khách sạn
    getHotels: async () => {
        return await axiosClient.get(API_ENDPOINTS.HOTELS.GET_ALL);
    },

    // Lấy danh sách khách sạn của User
    getMyHotels: async () => {
        return await axiosClient.get(API_ENDPOINTS.PARTNER.HOTEL.LIST);
    },

    getHotelById: async (hotel_id) => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.HOTEL.DETAIL(hotel_id));
    },

    // Thêm mới khách sạn
    store: async (data) => {
        return await axiosClient.post(API_ENDPOINTS.PARTNER.HOTEL.CREATE, data);
    },

    // Cập nhật khách sạn
    update: async (hotel_id, data) => {
        return await axiosClient.put(API_ENDPOINTS.PARTNER.HOTEL.UPDATE(hotel_id), data);
    }

    // Xóa khách sạn
}

export default hotelApi;