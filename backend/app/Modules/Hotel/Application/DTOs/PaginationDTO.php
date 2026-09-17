<?php

namespace App\Modules\Hotel\Application\DTOs;

class PaginationDTO
{
    public function __construct(
        public readonly int $page,
        public readonly int $limit,
    ) {}

    public static function pagination(array $pagination): self
    {
        return new self(
            page: $pagination['page'] ?? 1,
            limit: $pagination['limit'] ?? 10
        );
    }
}
