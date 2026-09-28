<?php

namespace App\Modules\Location\Domain\Repositories;

use App\Modules\Location\Domain\ValueObjects\CityId;

interface WardRepositoryInterface
{
    public function getListByCityId(CityId $cityId, array $filters): array;
}
