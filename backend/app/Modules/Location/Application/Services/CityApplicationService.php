<?php

namespace App\Modules\Location\Application\Services;

use App\Modules\Hotel\Application\DTOs\PaginationDTO;
use App\Modules\Location\Domain\Repositories\CityRepositoryInterface;

class CityApplicationService
{
    public function __construct(
        private readonly CityRepositoryInterface $CityRepositoryInterface
    ) {}

    public function getList(?PaginationDTO $filters = null): array
    {
        return $this->CityRepositoryInterface->list((array) $filters);
    }
}
