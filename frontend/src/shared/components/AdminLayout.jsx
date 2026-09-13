// src/shared/components/AdminLayout.tsx
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Box, Divider, Grid, IconButton, Typography } from '@mui/material';

export const HEADER_HEIGHT = 80;

// Thanh Sidebar bên trái
export const Sidebar = () => {
    // Danh mục chức năng của hệ quản trị trong hệ thống
    const categories = [
        { id: 'dashboard', name: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
        { id: 'hotel', name: 'Hotel', icon: <HotelIcon />, path: '/admin/hotels' },
        { id: 'booking', name: 'Booking', icon: <BookOnlineIcon />, path: '/admin' },
        { id: 'location', name: 'Location', icon: <LocationOnIcon />, path: '/admin' },
        { id: 'users', name: 'Users', icon: <PeopleIcon />, path: '/admin' },
    ];

    return (
        <Grid
            sx={{
                bgcolor: '#1E293B',
                color: '#94A3B8',
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto'
            }}
            size={{ xs: 5, md: 2 }}
        >
            {/* Avt */}
            <Grid sx={{ height: HEADER_HEIGHT }}>
                <Box
                    component="img"
                    src="/./assets/image/common/logo-website.png"
                    alt="Happy Travel Logo"
                    sx={{
                        maxWidth: '100px',  // Giới hạn chiều rộng (chỉnh con số này để to/nhỏ tùy ý)
                        height: 'auto',     // Tự động chỉnh chiều cao theo tỉ lệ
                        objectFit: 'contain',
                    }}
                />

            </Grid>

            <Divider sx={{ borderColor: '#94A3B8', my: 1 }} />

            {/*  Chức năng */}
            <Grid
                sx={{
                    py: 1,         // Padding trên/dưới
                    gap: 1.5       // 👈 Khoảng cách cố định (12px) đều giữa tất cả các items
                }}
            >
                {
                    categories.map((category) => (
                        <Grid
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,                  // Khoảng cách giữa Icon và Text
                                p: 1.25,                 // Padding bên trong từng dòng (khoảng bấm rộng hơn)
                                borderRadius: 1.5,       // Bo tròn góc nhẹ cho hiện đại
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Hiệu ứng hover khi rê chuột
                                },
                                userSelect: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            <Grid> {category.icon} </Grid>
                            <Grid>
                                <Typography component="span" > {category.name} </Typography>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid >

            {/* Button đóng mở */}
            <Grid
                sx={{
                    position: 'relative',
                    height: '100vh'
                }}
            >
                <ChevronLeftIcon
                    sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: 8,
                    }}
                />
            </Grid >
        </Grid>
    );
};

// Thanh TopBar header
export const Topbar = ({ title }) => {
    return (
        <>
            <Grid
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    height: HEADER_HEIGHT,
                }}
            >
                <Grid
                    sx={{
                        textAlign: 'start',
                        pl: 3,
                        fontWeight: 'bold'
                    }}
                    size={{ md: 7 }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 'bold'
                        }}
                    >
                        {title}
                    </Typography>
                </Grid>

                <Grid
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 2,
                        ml: 'auto',
                        pr: 3
                    }}
                    size={{ md: 5 }}
                >
                    <IconButton><SearchIcon /></IconButton>
                    <IconButton><NotificationsIcon /></IconButton>
                    <Avatar src="/avatar.jpg" sx={{ width: 32, height: 32, cursor: 'pointer' }} />
                </Grid>

            </Grid >

            <Divider sx={{ borderColor: '#94A3B8', my: 1 }} />
        </>
    );
};


export const Content = ({
    children,
}) => {
    return (
        <Grid component="main" sx={{ flexGrow: 1, p: 3 }}>
            {children}
        </Grid>
    );
};

// Hiển thị layout chung của admin
export const AdminLayout = ({
    children, title
}) => {
    return (
        <Grid container sx={{ display: 'flex', width: '100%' }}>
            {/* Thanh Sidebar - menu chức năng trong trang admin (bên trái) */}
            <Sidebar />

            {/* header + content bên phải */}
            <Grid
                size={{ xs: 6, md: 10 }}
            >
                <Topbar title={title} />

                <Content children={children} />
            </Grid>
        </Grid >
    );
};
