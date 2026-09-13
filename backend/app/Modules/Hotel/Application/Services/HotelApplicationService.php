<?php

namespace App\Modules\Hotel\Application\Services;

use App\Modules\Hotel\Application\DTOs\CreateHotelDTO;
use App\Modules\Hotel\Domain\Entities\Hotel;
use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;

class HotelApplicationService
{
    public function __construct(
        private readonly HotelRepositoryInterface $hotelRepository
    ) {}

    public function createHotel(CreateHotelDTO $dto): Hotel
    {
        // 1. Dựng đối tượng Domain Entity từ DTO
        $hotel = new Hotel(
            id: null,
            userId: $dto->userId,
            wardId: $dto->wardId,
            hotelName: $dto->hotelName,
            diaChiSnapshot: $dto->diaChiSnapshot,
            diaChiChiTiet: $dto->diaChiChiTiet,
            sdt: $dto->sdt,
            ratingTB: 0.0,
            isFloatingHotel: $dto->isFloatingHotel
        );
        // 2. Gọi Repository để lưu Entity xuống MySQL
        return $this->hotelRepository->save($hotel);
    }
}
