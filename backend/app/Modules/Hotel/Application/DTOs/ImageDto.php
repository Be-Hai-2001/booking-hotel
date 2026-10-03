<?php

namespace App\Modules\Hotel\Application\DTOs;

use App\Modules\Hotel\Domain\Entities\Hotel;

class ImageDto
{
    public function __construct(
        public readonly int $userId,
        public readonly bool $isPartner,
        public readonly array $files,
        public readonly ?int $sortOder,
        public readonly bool $isCover

    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            userId: $data['user_id'] ?? null,
            isPartner: $data['is_partner'] ?? false,
            files: $data['files'] ?? '',
            isCover: $data['is_cover'] ?? false,
            sortOder: $data['sort_oder'] ?? null,
        );
    }
}
