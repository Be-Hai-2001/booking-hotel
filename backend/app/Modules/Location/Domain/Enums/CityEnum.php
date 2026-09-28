<?php

namespace App\Modules\Location\Domain\Enums;

use function PHPUnit\Framework\matches;

enum CityEnum: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public function label(): string
    {
        return match ($this) {
            self::ACTIVE => 'Đang hoạt động',
            self::INACTIVE => 'Ngừng hoạt động'
        };
    }
}
