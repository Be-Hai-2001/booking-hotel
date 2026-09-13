<?php

namespace App\Modules\User\Application\DTOs;

// Convert dữ liệu đầu ra

final class LoginUserAdminResultDTo
{
    public function __construct(
        public readonly int $id,
        public readonly  string $email,
        public readonly string $sdt,
        public readonly string $role,
        public readonly string $accessToken,
        public readonly string $tokenType = 'Bearer'
    ) {}
}
