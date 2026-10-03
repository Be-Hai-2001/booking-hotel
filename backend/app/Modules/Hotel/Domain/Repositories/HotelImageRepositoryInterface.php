<?php

namespace App\Modules\Hotel\Domain\Repositories;

use App\Modules\Hotel\Domain\Entities\HotelImage;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;

interface HotelImageRepositoryInterface
{
    public function save(HotelImage $hotelImage): HotelImage;

    public function destroy(int $hotelImageId);

    public function listByHotelId(array $filter, HotelId $id): array;

    public function findByHotelId(): ?HotelImage;

    public function nextOrder(int $hotelId): int;
}
