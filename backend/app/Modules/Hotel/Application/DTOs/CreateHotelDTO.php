<?php

namespace App\Modules\Hotel\Application\DTOs;

use App\Modules\Hotel\Domain\Enums\HotelStatus;

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
        public readonly HotelStatus $status
    ) {}

    public static function Pagination(object $pagination): array
    {
        return [
            'page' =>  $pagination->page ?? 1,
            'limit' => $pagination->limit ?? 10
        ];
    }

    public static function fromRequest(array $data, int $userId): self
    {
        // Sử dụng Named Arguments (truyền tên tham số cụ thể) để tránh hoàn toàn lỗi lệch vị trí
        $rawStatus = $data['status'] ?? HotelStatus::PENDING->value;

        return new self(
            userId: $userId,
            wardId: (int) ($data['ward_id'] ?? $data['xa_phuong_id']),
            hotelName: $data['hotel_name'] ?? '',
            diaChiSnapshot: $data['diaChiSnapshot'],
            diaChiChiTiet: $data['diaChiChiTiet'] ?? '',
            sdt: $data['sdt'] ?? '',
            isFloatingHotel: (bool) ($data['is_floating_hotel'] ?? false),
            status: is_string($rawStatus)
                ? (HotelStatus::tryFrom($rawStatus) ?? HotelStatus::PENDING)
                : $rawStatus,
        );
    }
}
