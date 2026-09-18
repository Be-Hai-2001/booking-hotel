import React from "react";
import { axiosClient } from "../../../shared/api/axiosClient";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";

export const authApi = {

    login: async (data) => {
        return await axiosClient.post(API_ENDPOINTS.PARTNER.AUTH.LOGIN, data);
    },

    logout: async () => {
        return await axiosClient.post();
    }
}

export default authApi;