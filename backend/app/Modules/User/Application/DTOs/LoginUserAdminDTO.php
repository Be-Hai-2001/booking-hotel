<?php

namespace App\Modules\User\Application\DTOs;

// Convert dữ liệu đầu vào

final class LoginUserAdminDTO
{
    // Phương thức khởi tạo bắt buộc đầu vào
    public function __construct(
        public readonly string $identifier,
        public readonly string $password
    ) {}

    // Convert mảng đã validate chuyển đến Controller
    public static function fromArray(array $data): self
    {
        return new self(
            identifier: $data['login'],
            password: $data['password']
        );
    }
}
