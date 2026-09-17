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
import { Avatar, Box, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { lightBlue } from "@mui/material/colors";

export const HEADER_HEIGHT = 80;

// Thanh Sidebar bên trái
export const Sidebar = () => {
    // Đường dẫn link theo trang admin hoặc partner
    const prefix = 'partner';

    // Khai báo hook useNavigate
    const navigate = useNavigate();

    // Danh mục chức năng của hệ quản trị trong hệ thống
    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: <DashboardIcon />, path: `/${prefix}/dashboard` },
        { id: 'hotel', name: 'Hotel', icon: <HotelIcon />, path: `/${prefix}/hotels` },
        { id: 'booking', name: 'Booking', icon: <BookOnlineIcon />, path: `/${prefix}` },
        { id: 'location', name: 'Location', icon: <LocationOnIcon />, path: `/${prefix}` },
        { id: 'users', name: 'Users', icon: <PeopleIcon />, path: `/${prefix}` },
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
                    <List>
                        {
                            menuItems.map((item) => (
                                <ListItem disablePadding key={item.id}>
                                    <ListItemButton
                                        onClick={() => navigate(item.path)}
                                        selected={location.pathname === item.path}
                                        sx={{
                                            borderRadius: 1.5,
                                            // 1. Hover cho menu BÌNH THƯỜNG (khi chưa selected)
                                            '&:hover': {
                                                bgcolor: 'rgba(255, 255, 255, 0.08)', // hoặc màu bạn thích
                                            },

                                            // 2. Hover cho menu ĐANG ĐƯỢC CHỌN
                                            '&.Mui-selected': {
                                                color: '#fff',
                                                '& .MuiListItemIcon-root': { color: '#fff' },
                                                '&:hover': {
                                                    bgcolor: '#1d4ed8',
                                                },
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'lightBlue' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
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
        </Grid >
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
