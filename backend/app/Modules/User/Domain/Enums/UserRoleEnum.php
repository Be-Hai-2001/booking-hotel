<?php

namespace App\Modules\User\Domain\Enums;

enum UserRoleEnum: string
{
    case CUSTOMER = 'customer';
    case ADMIN = 'admin';
    case PARTNER = 'partner';

    public function lable(): string
    {
        return match ($this) {
            self::CUSTOMER => 'Khách hàng',
            self::ADMIN => 'Quản trị viên hệ thống',
            self::PARTNER => 'Đối tác khách sạn'
        };
    }
}
