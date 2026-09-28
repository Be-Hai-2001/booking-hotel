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

    // Thêm mới khách sạn
    createHotel: async (data) => {
        return await axiosClient.post(API_ENDPOINTS.PARTNER.HOTEL.CREATE, data);
    },

    // Cập nhật khách sạn

    // Xóa khách sạn
}

export default hotelApi;