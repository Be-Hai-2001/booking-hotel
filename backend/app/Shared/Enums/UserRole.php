<?php

namespace App\Shared\Enums;

enum UserRole: string
{
    case ADMIN = 'admin';
    case PARTNER = 'partner';
    case CUSTOMER = 'customer';

    public function lable(): string
    {
        return match ($this) {
            self::ADMIN => 'Quản trị viên hệ thống',
            self::PARTNER => 'Đối tác khách sạn',
            self::CUSTOMER => 'Khách hàng'
        };
    }
}
