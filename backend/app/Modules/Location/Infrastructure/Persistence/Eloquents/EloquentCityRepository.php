<?php

namespace App\Modules\Location\Infrastructure\Persistence\Eloquents;

use App\Modules\Location\Domain\Enums\CityEnum;
use App\Modules\Location\Domain\Repositories\CityRepositoryInterface;
use App\Modules\Location\Infrastructure\Persistence\Models\CityModel;
use Override;

class EloquentCityRepository implements CityRepositoryInterface
{
    #[Override]
    public function list(array $filters): array
    {
        $query = CityModel::whereNot(
            'status',
            CityEnum::INACTIVE->value
        )->get(['id', 'code', 'name', 'status']);

        return $query->toArray();
    }
}
