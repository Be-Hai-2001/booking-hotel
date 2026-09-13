import { axiosClient } from "../../../shared/api/axiosClient";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";

export const hotelApi = {
    // Lấy toàn bộ danh sách khách sạn
    getHotels: async () => {
        const response = await axiosClient.get(API_ENDPOINTS.HOTELS.GET_ALL);
        return response.data.data;
    },

    // Lấy danh sách khách sạn của User
    getMyHotels: async () => {
        const response = await axiosClient.get(API_ENDPOINTS.HOTELS.MY_HOTELS);
        return response.data.data
    },

    // Thêm mới khách sạn
    createHotel: async () => {
        const response = await axiosClient.get(API_ENDPOINTS.HOTELS.CREATE);
        return response.data.data;
    },

    // Cập nhật khách sạn

    // Xóa khách sạn
}