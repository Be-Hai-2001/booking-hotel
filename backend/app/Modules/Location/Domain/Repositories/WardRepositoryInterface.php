<?php

namespace App\Modules\Location\Domain\Repositories;

use App\Modules\Location\Domain\ValueObjects\CityId;
use App\Modules\Location\Domain\ValueObjects\WardId;

interface WardRepositoryInterface
{
    public function getListByCityId(CityId $cityId, array $filters): array;

    public function getWardById(WardId $cityId);
}
