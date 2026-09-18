
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import authApi from "../../infrastructure/authApi";
import authStorage from "../../infrastructure/storage/tokenStorage";
import { UserRole } from "../../../../shared/constants/roles";
import { Navigate } from "react-router-dom";
import HotelsPartnerPage, { Hotels } from "../../../hotel/presentation/partner/HotelsPartnerPage";
import { partnerRoutes } from "../../../../routes/partnerRoutes";
import { API_ENDPOINTS } from "../../../../shared/api/endpoints";

export const LoginPage = () => {

    //Form đăng nhập
    const [formData, setFormData] = useState({ login: '', password: '' });
    const [focusedField, setFocusedField] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gọi api đăng nhập user
            const respon = await authApi.login(formData);
            const { access_token, user } = respon.data;

            // Lưu token và thông tin user trong localStorage
            authStorage.setToken(access_token);
            authStorage.setUser(user);

            // Kiểm tra quyền user để navigate
            if (user.role === UserRole.PARTNER)
                return <Navigate to={API_ENDPOINTS.PARTNER.DASHBOARD} />

            if (user.role === UserRole.ADMIN)
                return <Navigate to={API_ENDPOINTS.ADMIN.DASHBOARD} />


        } catch (error) {

        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#1E293B',
                    backgroundPosition: 'center',
                    backgroundColor: '#1E293B',
                    transform: 'scale(1.05)', // Tránh bị vệt trắng ở viền khi blur
                    zIndex: 0,

                }}
            />
            <Box
                sx={{
                    width: { xs: '90%', sm: '400px' }, // Trên mobile chiếm 90% màn hình, màn hình lớn hơn tự cố định 400px
                    maxWidth: '450px',                 // Giới hạn chiều rộng tối đa không bị vỡ giao diện
                    mx: 'auto',                         // Căn giữa theo chiều ngang
                    p: { xs: 2, sm: 3 },               // Padding linh hoạt theo kích thước màn hình
                    zIndex: 1,
                    background: 'aliceblue',
                    borderRadius: '8px',
                    boxSizing: 'border-box',
                }}
            >
                <Box
                    component="img"
                    src="../assets/image/common/logo-website.png"
                    alt="Happy Travel Logo"
                    sx={{
                        maxWidth: '100px',  // Giới hạn chiều rộng (chỉnh con số này để to/nhỏ tùy ý)
                        height: 'auto',     // Tự động chỉnh chiều cao theo tỉ lệ
                        objectFit: 'contain',
                    }}
                />

                <Stack
                    spacing={2}
                    sx={{
                        width: '100%',
                        maxWidth: '500px',
                        mx: 'auto',
                    }}
                >
                    <Typography
                        sx={{
                            padding: '10px 0',
                            userSelect: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Hệ thống quản trị
                    </Typography>

                    <TextField
                        label="Email hoặc số điện thoại"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('login')}
                        onBlur={() => setFocusedField('')}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            },
                            inputLabel: {
                                shrink: focusedField === 'login' || Boolean(formData.login),
                                sx: {
                                    '&:not(.MuiInputLabel-shrink)': {
                                        transform: 'translate(48px, 16px) scale(1)',
                                    },
                                },
                            },
                        }}
                        variant="outlined"
                        required
                    />

                    <TextField
                        label="Mật khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField('')}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            },
                            inputLabel: {
                                shrink: focusedField === 'password' || Boolean(formData.password),
                                sx: {
                                    '&:not(.MuiInputLabel-shrink)': {
                                        transform: 'translate(48px, 16px) scale(1)',
                                    },
                                },
                            },
                        }}
                        variant="outlined"
                        required
                    />

                    <Stack
                        spacing={1}
                        justifyContent="center"
                        sx={{ mt: 1 }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            sx={{ mt: 1 }}
                            onClick={handleSubmit}
                        >
                            ĐĂNG NHẬP
                        </Button>
                        <Button color="primary">QUÊN MẬT KHẨU?</Button>
                        <Button color="primary">ĐĂNG KÝ</Button>
                    </Stack>
                </Stack>
            </Box>

        </Box >
    );
};

export default LoginPage;