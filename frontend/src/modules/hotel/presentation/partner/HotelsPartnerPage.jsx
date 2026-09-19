
import { AdminLayout } from '../../../../shared/components/AdminLayout';
import { DataGrid } from '../../../../shared/components/DataGrid';
import useHotels from '../../application/useHotels';

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

// Content UI danh sacch khach san
const Hotels = () => {
    const { hotels, loading } = useHotels();

    return (
        <DataGrid
            columns={columns}
            rows={hotels}
            loading={loading}
            columnVisibilityModel={{
                ward_id: false
            }}
        />
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