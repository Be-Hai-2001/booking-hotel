import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { authApi } from '../infrastructure/authApi';
import authStorage from "../infrastructure/storage/tokenStorage";
import { UserRole } from "../../../shared/constants/roles";
import { API_ENDPOINTS } from "../../../shared/api/endpoints";

export const useLogin = () => {
    // Khai báo hook useNavigate
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    //Form đăng nhập
    const [formData, setFormData] = useState({ login: '', password: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Gọi api đăng nhập user
            const respon = await authApi.login(formData);
            const { access_token, user } = respon.data;

            // Lưu token và thông tin user trong localStorage
            authStorage.setToken(access_token);
            authStorage.setUser(user);

            // Kiểm tra quyền user để navigate
            if (user.role === UserRole.PARTNER)
                // console.log(API_ENDPOINTS.PARTNER.DASHBOARD)
                return navigate(API_ENDPOINTS.PARTNER.DASHBOARD);

            if (user.role === UserRole.ADMIN)
                return navigate(API_ENDPOINTS.ADMIN.DASHBOARD);


        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        errorMsg
    }
}

export default useLogin;