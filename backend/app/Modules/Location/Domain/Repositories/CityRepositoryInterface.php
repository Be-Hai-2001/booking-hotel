<?php

namespace App\Modules\Location\Domain\Repositories;

interface CityRepositoryInterface
{
    public function list(array $filters): array;
}
