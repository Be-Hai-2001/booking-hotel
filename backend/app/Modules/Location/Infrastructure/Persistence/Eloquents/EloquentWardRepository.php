<?php

namespace App\Modules\Location\Infrastructure\Persistence\Eloquents;

use App\Modules\Location\Domain\Repositories\WardRepositoryInterface;
use App\Modules\Location\Domain\Enums\WardEnum;
use App\Modules\Location\Domain\ValueObjects\CityId;
use App\Modules\Location\Infrastructure\Persistence\Models\WardModel;

class EloquentWardRepository implements WardRepositoryInterface
{
    public function getListByCityId(CityId $cityId, array $filters): array
    {
        $query = WardModel::where('city_id', $cityId->value())
            ->whereNot('status', WardEnum::INACTIVE->value)
            ->get([
                'id',
                'code',
                'name',
                'status',
                'valid_from'
            ]);

        return $query->toArray();
    }
}
