<?php

namespace App\Modules\Dashboard\Application\DTOs;

class DashboardStatsDTO
{
    public function __construct(
        public readonly int $totalHotels,
        public readonly int $totalFloatingHotels
    ) {}

    /**
     * Chuyển đổi DTO thành Array để Controller dễ dàng serialize ra JSON
     */
    public function toArray(): array
    {
        return [
            'total_hotels' => $this->totalHotels,
            'total_floating_hotels' => $this->totalFloatingHotels,
        ];
    }
}
