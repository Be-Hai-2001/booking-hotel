<?php

namespace App\Modules\Hotel\Application\DTOs;

final class AddressPartsDto
{
    public function __construct(
        public readonly string $wardName,
        public readonly string $cityName,
    ) {}
}
