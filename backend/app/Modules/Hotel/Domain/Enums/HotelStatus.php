<?php

namespace App\Modules\Hotel\Domain\Enums;

enum HotelStatus: string
{
    case PENDING = 'pending'; // Chờ duyệt
    case ACTIVE = 'active'; // Đang hoạt động
    case INACTIVE = 'inactive'; // Tạm ngưng hoạt động
    case MAINTENANCE = 'maintenance'; // Đang bảo trì

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Chờ duyệt',
            self::ACTIVE => 'Đang hoạt động',
            self::INACTIVE => 'Tạm ngưng',
            self::MAINTENANCE => 'Đang bảo trì',
        };
    }
}
