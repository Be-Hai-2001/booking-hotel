
import { AdminLayout } from '../../../../shared/components/AdminLayout';
import { DataGrid } from '../../../../shared/components/DataGrid';
import useHotels from '../../application/useHotels';
import { hotelEnums } from '../constants/hotelEnums';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import BuildIcon from '@mui/icons-material/Build';
import { Box, Chip } from '@mui/material';
import AddButton from '../../../../shared/components/AddButton';
import { useNavigate } from 'react-router-dom';
import hotelApi from '../../infrastructure/hotelApi';
import { ROUTE } from '../../../../shared/api/route';

const STATUS_CONFIG = {
    [hotelEnums.STATUS.PENDING]: { color: 'warning', icon: <HourglassEmptyIcon /> },
    [hotelEnums.STATUS.ACTIVE]: { color: 'success', icon: <CheckCircleIcon /> },
    [hotelEnums.STATUS.INACTIVE]: { color: 'error', icon: <CancelIcon /> },
    [hotelEnums.STATUS.MAINTENANCE]: { color: 'info', icon: <BuildIcon /> },
};

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
        field: '',
        headerName: 'Thao tác',
        flex: 1.5,
        minWidth: 180
    },
    // Khai báo ward_id để DataGrid quản lý dữ liệu
    {
        field: 'ward_id',
        headerName: 'Phường xã',
        editable: true,
        hide: true,
    },
];


// Content UI danh sacch khach san
const Hotels = () => {

    const navigate = useNavigate();
    const { hotels, loading } = useHotels();

    return (
        <>
            <Box sx={{ textAlign: 'end', marginBottom: '15px' }}>
                <AddButton
                    handleClick={() => { navigate(ROUTE.PARTNER.HOTEL.CREATE) }}
                />
            </Box>
            <DataGrid
                columns={columns}
                rows={hotels}
                loading={loading}
                columnVisibilityModel={{
                    ward_id: false
                }}
                sx={{
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#334155',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: '#fff',
                        fontWeight: 700,
                    },

                    // nút sắp xếp + nút 3 chấm: nền trong suốt, icon trắng
                    '& .MuiDataGrid-columnHeader .MuiIconButton-root': {
                        backgroundColor: 'transparent',
                        color: '#fff',
                    },
                    '& .MuiDataGrid-columnHeader .MuiIconButton-root:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '& .MuiDataGrid-columnHeader .MuiSvgIcon-root': {
                        color: '#fff',
                    },
                }}
            />
        </>
    );
};


// UI danh sach khach san
export const HotelsPartnerPage = () => {
    return (
        <AdminLayout
            title={'Danh sách khách sạn'}
            children={<Hotels />}
        />
    );
};
export default HotelsPartnerPage;