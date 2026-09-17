
import { use, useEffect, useState } from 'react';
import { AdminLayout } from '../../../../shared/components/AdminLayout';
import { DataGrid } from '../../../../shared/components/DataGrid';
import { hotelApi } from '../../infrastructure/hotelApi';

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
        width: 120,
        // (Tùy chọn) Render trạng thái dạng Badge/Label cho đẹp
        renderCell: (params) => (
            params.value === 'active' ? 'Hoạt động' : 'Tạm dừng'
        )
    },
    // Khai báo ward_id để DataGrid quản lý dữ liệu
    {
        field: 'ward_id',
        headerName: 'Phường xã',
        editable: true,
        hide: true,
    },
];

export const Hotels = () => {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const response = await hotelApi.getMyHotels();
                const hotelList = Array.isArray(response?.data)
                    ? response.data
                    : (Array.isArray(response) ? response : []);
                setHotels(hotelList);
            } catch (error) {
                console.error('Lỗi khi tải danh sách khách sạn:', error);
            } finally {
                setLoading(!loading);
            }
        }

        fetchHotels();
    }, []);

    return (
        <>
            <DataGrid
                columns={columns}
                rows={hotels}
                columnVisibilityModel={{
                    ward_id: false
                }}
            />
        </>
    )
};

export const HotelsPartnerPage = () => {
    return (
        <AdminLayout
            title={'Danh sách khách sạn'}
            children={<Hotels />}
        />
    );
};
export default HotelsPartnerPage;