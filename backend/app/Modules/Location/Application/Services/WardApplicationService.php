<?php

namespace App\Modules\Location\Application\Services;

use App\Modules\Location\Domain\Repositories\WardRepositoryInterface;
use App\Modules\Location\Domain\ValueObjects\CityId;

class WardApplicationService
{
    public function __construct(
        private readonly WardRepositoryInterface $WardRepositoryInterface
    ) {}

    public function list(CityId $cityId, array $filters = []): array
    {
        return $this->WardRepositoryInterface->getListByCityId($cityId, $filters);
    }
}
