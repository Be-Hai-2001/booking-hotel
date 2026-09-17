<?php

namespace App\Modules\User\Domain\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case PARTNER = 'partner';

    public function lable(): string
    {
        return match ($this) {
            self::ADMIN => 'Quản trị viên hệ thống',
            self::PARTNER => 'Đối tác khách sạn'
        };
    }
}
