import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ allowedRoles = [] }) => {
    // 1. Lấy token và thông tin user từ localStorage / Context / Redux
    const token = localStorage.getItem('access_token');

    // Giả sử user được lưu dưới dạng JSON trong localStorage
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    // 2. Chưa đăng nhập -> Đá về trang Login
    if (!token || !user) {
        return;
    }

    // 3. Đã đăng nhập nhưng Role không hợp lệ -> Chuyển hướng
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return;
    }

    // 4. Thỏa mãn điều kiện -> Cho phép hiển thị các Route con
    return;
};

export default ProtectedRoute;