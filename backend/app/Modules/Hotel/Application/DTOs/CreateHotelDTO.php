<?php

namespace App\Modules\Hotel\Application\DTOs;

class CreateHotelDTO
{
    public function __construct(
        public readonly int $userId,
        public readonly int $wardId,
        public readonly string $hotelName,
        public readonly string $diaChiSnapshot,
        public readonly string $diaChiChiTiet,
        public readonly string $sdt,
        public readonly bool $isFloatingHotel,
    ) {}

    public static function fromRequest(array $data, int $userId): self
    {
        // Sử dụng Named Arguments (truyền tên tham số cụ thể) để tránh hoàn toàn lỗi lệch vị trí
        return new self(
            userId: $userId,
            wardId: (int) ($data['ward_id'] ?? $data['xa_phuong_id']),
            hotelName: $data['hotel_name'] ?? $data['tenKS'],
            diaChiSnapshot: $data['diaChiSnapshot'],
            diaChiChiTiet: $data['diaChiChiTiet'] ?? '',
            sdt: $data['sdt'] ?? '',
            isFloatingHotel: (bool) ($data['is_floating_hotel'] ?? false)
        );
    }
}
