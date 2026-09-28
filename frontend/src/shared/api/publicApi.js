import { axiosClient } from "./axiosClient"
import { API_ENDPOINTS } from "./endpoints"

export const publicApi = {
    getCities: async () => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.CITIES);
    },

    getWardsByCity: async (city_id) => {
        return await axiosClient.get(API_ENDPOINTS.PUBLIC.WARDS_BYCITY_ID(city_id));
    }
}