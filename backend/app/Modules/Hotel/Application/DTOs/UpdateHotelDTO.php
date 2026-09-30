<?php

namespace App\Modules\Hotel\Application\DTOs;

use App\Modules\Hotel\Domain\Enums\HotelStatus;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;

class UpdateHotelDTO
{
    public function __construct(
        public readonly HotelId $hotelId,
        public readonly int $wardId,
        public readonly string $hotelName,
        public readonly string $diaChiSnapshot,
        public readonly string $diaChiChiTiet,
        public readonly string $sdt,
        public readonly bool $isFloatingHotel,
        public readonly HotelStatus $status,
    ) {}

    public static function fromRequest(array $data, HotelId $hotelId): self
    {
        $rawStatus = $data['status'] ?? HotelStatus::PENDING->value;

        return new self(
            hotelId: $hotelId,
            wardId: (int) ($data['ward_id'] ?? $data['xa_phuong_id']),
            hotelName: $data['hotel_name'] ?? '',
            diaChiSnapshot: $data['diaChiSnapshot'] ?? '',
            diaChiChiTiet: $data['diaChiChiTiet'] ?? '',
            sdt: $data['sdt'] ?? '',
            isFloatingHotel: (bool) ($data['is_floating_hotel'] ?? false),
            status: is_string($rawStatus)
                ? (HotelStatus::tryFrom($rawStatus) ?? HotelStatus::PENDING)
                : $rawStatus,
        );
    }
}
