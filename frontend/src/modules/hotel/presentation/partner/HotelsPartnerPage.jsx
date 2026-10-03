
import { AdminLayout } from '../../../../shared/components/AdminLayout';
import { DataGrid } from '../../../../shared/components/DataGrid';
import useHotels from '../../application/useHotels';
import { hotelEnums } from '../constants/hotelEnums';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BuildIcon from '@mui/icons-material/Build';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import AddButton from '../../../../shared/components/AddButton';
import { useNavigate } from 'react-router-dom';
import hotelApi from '../../infrastructure/hotelApi';
import { ROUTE } from '../../../../shared/api/route';
import { Info, Edit, Delete } from '@mui/icons-material';
import { HotelDataGrid } from './components/HotelDataGrid'
import { API_ENDPOINTS } from '../../../../shared/api/endpoints';


const STATUS_CONFIG = {
    [hotelEnums.STATUS.PENDING]: { color: 'warning', icon: <HourglassEmptyIcon /> },
    [hotelEnums.STATUS.ACTIVE]: { color: 'success', icon: <CheckCircleIcon /> },
    [hotelEnums.STATUS.INACTIVE]: { color: 'error', icon: <CancelIcon /> },
    [hotelEnums.STATUS.MAINTENANCE]: { color: 'info', icon: <BuildIcon /> },
};

const operations = [
    { key: 'info', icon: <Info />, note: 'Chi tiết', color: 'info', action: ROUTE.PARTNER.HOTEL.INFO },
    { key: 'eidt', icon: <Edit />, note: 'Chỉnh sửa', color: 'primary', action: ROUTE.PARTNER.HOTEL.EDIT },
    { key: 'delete', icon: <Delete />, note: 'Xóa', color: 'error', action: API_ENDPOINTS.PARTNER.HOTEL.DELETE },
]

// UI danh sach khach san
export const HotelsPartnerPage = () => {

    const navigate = useNavigate();

    const { hotels, loading } = useHotels();

    const columns = [
        {
            field: 'id',
            headerName: 'Mã KS',
            width: 90
        },
        {
            field: 'hotel_name',
            headerName: 'Tên khách sạn',
            flex: 1.5,
            minWidth: 180
        },
        {
            field: 'sdt',
            headerName: 'Số điện thoại',
            width: 130
        },
        {
            field: 'ratingTB',
            headerName: 'Đánh giá',
            width: 100,
            // (Tùy chọn) Định dạng hiển thị số sao / điểm
            renderCell: (params) => `${params.value ?? 0} ⭐`
        },
        {
            field: 'diaChiChiTiet',
            headerName: 'Địa chỉ chi tiết',
            flex: 2,
            minWidth: 200
        },
        {
            field: 'diaChiSnapshot',
            headerName: 'Địa chỉ cố định',
            flex: 1.5,
            minWidth: 180
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            width: 160,
            renderCell: (params) => {
                const config = STATUS_CONFIG[params.value] ?? { color: 'default', icon: undefined };

                return (
                    <Chip
                        icon={config.icon}
                        label={params.row.status_label ?? params.value}
                        color={config.color}
                        variant="outlined"
                        size="small"
                    />
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1.5,
            minWidth: 180,
            renderCell: (params) => (
                <Box>
                    {operations.map((item) => (
                        <Tooltip key={item.key} title={item.note} arrow>
                            <IconButton
                                size="small"
                                onClick={() =>
                                    item.key === 'delete'
                                        ? item.onClick(params.row)
                                        : navigate(item.action(params?.id))
                                }
                                color={item.color}
                            >
                                {item.icon}
                            </IconButton>
                        </Tooltip>
                    ))
                    }
                </Box >
            ),
        },
        // Khai báo ward_id để DataGrid quản lý dữ liệu
        {
            field: 'ward_id',
            headerName: 'Phường xã',
            editable: true,
            hide: true,
        },
    ];

    return (
        <AdminLayout
            title={'Danh sách khách sạn'}
            children={
                <HotelDataGrid
                    navigate={navigate}
                    hotels={hotels}
                    loading={loading}
                    columns={columns}
                />
            }
        />
    );
};
export default HotelsPartnerPage;