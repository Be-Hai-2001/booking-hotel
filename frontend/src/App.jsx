import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';


// Import các trang từ Tầng Presentation của các Module
import HotelsPage from './modules/hotel/presentation/HotelsPage';
import { theme } from './shared/theme/theme.js';
export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline giúp reset CSS chuẩn hóa giao diện giữa các trình duyệt */}
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          {/* Route Danh sách khách sạn */}
          <Route path="/admin/hotels" element={<HotelsPage />} />

          {/* Điều hướng mặc định về trang danh sách khách sạn */}
          <Route path="*" element={<Navigate to="/admin/hotels" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;