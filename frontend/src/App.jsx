import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';


// Import các trang từ Tầng Presentation của các Module
import { theme } from './shared/theme/theme.js';
import HotelsPartnerPage from './modules/hotel/presentation/partner/HotelsPartnerPage.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';
export const App = () => {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline giúp reset CSS chuẩn hóa giao diện giữa các trình duyệt */}
            <CssBaseline />

            <BrowserRouter>
                <AppRoutes />
                {/* Route Danh sách khách sạn */}
                {/* <Route path="/partner/hotels" element={<HotelsPartnerPage />} /> */}

                {/* Điều hướng mặc định về trang danh sách khách sạn */}
                {/* <Route path="*" element={<Navigate to="/partner/hotels" replace />} /> */}
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;