<?php

namespace App\Modules\Location\Domain\Entities;

class City
{

    public function __construct(
        public readonly int $id,
        public readonly int $code,
        public readonly string $name,
        // public readonly int $status,
    ) {}
}
