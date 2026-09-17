<?php

namespace App\Modules\User\Domain\Entities;

use App\Modules\User\Domain\Enums\UserRole;
use App\Modules\User\Domain\Enums\UserStatus;

class User
{
    public function __construct(
        public ?int $id,
        public readonly string $name,
        public readonly ?string $cccd,
        public readonly ?string $email,
        public readonly string $sdt,
        public readonly string $password,
        public readonly UserRole $role,
        public readonly UserStatus $status
    ) {}

    // Kiểm tra có phải là admin || customer đăng nhập không
    // public function isStaff(): bool
    // {
    //     $isCustomer = $this->role === UserRole::CUSTOMER;

    //     return $isCustomer;
    // }

    // public function hasRole(UserRole $role): bool
    // {
    //     return $this->role === $role;
    // }
}
