// src/modules/hotel/domain/hotel.types.js

/**
 * Interface biểu diễn cho Đối tượng (Entity) Khách Sạn
 * Khớp với cấu trúc dữ liệu trả về từ Laravel Backend
 */
/**
 * @typedef {Object} Hotel
 * @property {number} id
 * @property {number} [user_id]
 * @property {string} hotel_name
 * @property {string} [diaChiChiTiet]
 * @property {string} [sdt]
 * @property {number} [ratingTB]
 * @property {boolean} is_floating_hotel - Khách sạn nổi bậc
 * @property {string} [created_at]
 * @property {string} [updated_at]
 */

/**
 * Data Transfer Object (DTO) dùng cho thao tác Tạo mới Khách sạn
 * Chứa các trường dữ liệu cần gửi lên Server khi submit Form
 */
/**
 * @typedef {Object} CreateHotelDTO
 * @property {string} hotel_name
 * @property {string} [diaChiChiTiet]
 * @property {string} [sdt]
 * @property {boolean} is_floating_hotel
 */

/**
 * DTO dùng cho thao tác Cập nhật Khách sạn (Tùy chọn)
 */
/**
 * @typedef {Object} UpdateHotelDTO
 * @property {string} [hotel_name]
 * @property {string} [diaChiChiTiet]
 * @property {string} [sdt]
 * @property {boolean} [is_floating_hotel]
 */