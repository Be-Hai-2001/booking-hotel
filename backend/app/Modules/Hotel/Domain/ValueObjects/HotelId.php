<?php

namespace App\Modules\Hotel\Domain\ValueObjects;

final class HotelId
{
    private int $value;

    public function __construct(int $value)
    {
        if ($value <= 0) {
            throw new \DomainException('Không tìm thấy khách sạn..!');
        }
        $this->value = $value;
    }

    public function value(): int
    {
        return $this->value;
    }
}
