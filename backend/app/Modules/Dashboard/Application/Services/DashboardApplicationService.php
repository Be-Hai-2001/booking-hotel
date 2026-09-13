<?php

namespace App\Modules\Dashboard\Application\Services;

use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;
use App\Modules\Dashboard\Application\DTOs\DashboardStatsDTO;

class DashboardApplicationService
{
    /**
     * Inject HotelRepositoryInterface để gọi các hàm query đếm số liệu
     */
    public function __construct(
        private readonly HotelRepositoryInterface $hotelRepository
    ) {}

    /**
     * Lấy dữ liệu thống kê tổng quan
     */
    public function getStats(): DashboardStatsDTO
    {
        // 1. Lấy dữ liệu đếm từ tầng Domain/Infrastructure thông qua Repository
        $totalHotels = $this->hotelRepository->countTotalHotels();
        $totalFloatingHotels = $this->hotelRepository->countFloatingHotels();

        // 2. Khởi tạo và trả về DTO chứa dữ liệu
        return new DashboardStatsDTO(
            totalHotels: $totalHotels,
            totalFloatingHotels: $totalFloatingHotels
        );
    }
}
