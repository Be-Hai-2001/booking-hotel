import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { authApi } from '../infrastructure/authApi';
import authStorage from "../infrastructure/storage/tokenStorage";
import { UserRole } from "../../../shared/constants/roles";
import { ROUTE } from "../../../shared/api/route";

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
                return navigate(ROUTE.PARTNER.DASHBOARD);

            if (user.role === UserRole.ADMIN)
                return navigate(ROUTE.ADMIN.DASHBOARD);

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