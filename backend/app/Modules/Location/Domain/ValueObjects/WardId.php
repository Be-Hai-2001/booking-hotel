<?php

namespace App\Modules\Location\Domain\ValueObjects;

final class WardId
{
    private int $value;

    public function __construct(int $value)
    {
        if ($value <= 0) {
            throw new \DomainException('Không tìm thấy id..!');
        }
        $this->value = $value;
    }

    public function value(): int
    {
        return $this->value;
    }
}
