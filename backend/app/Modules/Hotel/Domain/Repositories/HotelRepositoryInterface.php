<?php

namespace App\Modules\Hotel\Domain\Repositories;

use App\Modules\Hotel\Domain\Entities\Hotel;

/*
-> 1. Khai báo hợp đồng: Nhận vào các dữ liệu dạng mảng hoặc Entity và trả về Hotel Entity đã lưu
-> 2. Chuyển đến tầng Infrastructure\Persistence : nơi duy nhất trực tiếp gõ các lệnh SQL/Eloquent để giao tiếp với Cơ sở dữ liệu MySQ
*/

interface HotelRepositoryInterface
{
    /**
     * Tìm khách sạn theo ID
     */
    public function findById(int $id): ?Hotel;

    /**
     * Lưu thông tin khách sạn (Tự động chèn mới nếu chưa có ID, hoặc cập nhật nếu đã có ID)
     */
    public function save(Hotel $hotel): Hotel;

    /**
     * Xóa khách sạn theo ID
     */
    public function delete(int $id): bool;

    /**
     * Lấy danh sách khách sạn với phân trang
     */
    // public function listHotels(int $page, int $limit): array;

    /**
     * Lấy danh sách khách sạn theo phân quyền chủ sở hữu
     */
    // public function listHotelsAdmin(int $page, int $limit): array;
}
