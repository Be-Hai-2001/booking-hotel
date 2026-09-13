<?php

namespace App\Modules\Hotel\Domain\Enums;

enum RoomTypeStatus: string
{
    case ACTIVE = 'active'; // Đang kinh doanh / Mở bán cho khách book
    case INACTIVE = 'inactive'; // Tạm ngưng kinh doanh (Không hiển thị trên trang đặt phòng)
    case MAINTENANCE = 'maintenance'; // Đang bảo trì / Sửa chữa toàn bộ loại phòng này

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Đang mở bán',
            self::INACTIVE => 'Tạm ngưng bán',
            self::MAINTENANCE => 'Đang bảo trì',
        };
    }
}
