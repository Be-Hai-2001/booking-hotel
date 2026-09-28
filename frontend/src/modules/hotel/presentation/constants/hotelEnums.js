
// id -> khóa chính tự gen ra
// user_id -> Lấy từ local Storage
// ward_id -> Người dùng nhập -> lấy từ bảng ward
// hotel_name -> Người dùng nhâp
// diaChiSnapshot -> query map thành text từ bảng ward
// diaChiChiTiet  -> Người dùng nhập
// sdt  -> Người dùng nhập
// ratingTB  -> Admin cập nhật
// isFloatingHotel  -> Admin cập nhật
// status -> Admin cập nhật

export const hotelEnums = {

    Fields: {
        // Tự tạo ra ở BE
        ID: 'id',
        USER_ID: 'user_id',
        ADDRESS_SNAPSHOT: 'diaChiSnapshot',

        // Admin cập nhật
        RATINGTB: 'ratingTB',
        IS_FLOATING_HOTEL: 'isFloatingHotel',

        // Chủ khách sạn cập nhật
        HOTEL_NAME: 'hotel_name',
        WARD_ID: 'ward_id',
        ADDRESS_DETAIL: 'diaChiChiTiet',
        PHONE: 'sdt',
        STATUS: 'status',

        // Map => WARD_ID Không có ở trong bảng khách sạn
        CITY_ID: 'city_id',
    },

    STATUS: {
        PENDING: 'pending',
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        MAINTENANCE: 'maintenance',
    }
};