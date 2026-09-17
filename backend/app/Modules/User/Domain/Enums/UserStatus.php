<?php

namespace App\Modules\User\Domain\Enums;

enum UserStatus: string
{
    case PENDING = 'pending';
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';
    case BANNED = 'banned';

    /**
     * Nhãn hiển thị Tiếng Việt cho UI
     */
    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'Chờ kích hoạt',
            self::ACTIVE => 'Đang hoạt động',
            self::INACTIVE => 'Tạm ngưng',
            self::BANNED => 'Bị khóa',
        };
    }
}
