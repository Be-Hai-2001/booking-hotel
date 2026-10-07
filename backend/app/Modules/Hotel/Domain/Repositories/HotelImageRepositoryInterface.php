<?php

namespace App\Modules\Hotel\Domain\Repositories;

use App\Modules\Hotel\Domain\Entities\HotelImage;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;

interface HotelImageRepositoryInterface
{
    public function save(HotelImage $hotelImage): array;

    public function destroyMany(array $images): bool;

    public function listByHotelId(array $filter, HotelId $id): array;

    public function findByHotelId(): ?HotelImage;

    public function nextOrder(int $hotelId): int;
}
