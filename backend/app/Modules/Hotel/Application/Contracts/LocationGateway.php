<?php


namespace App\Modules\Hotel\Application\Contracts;

use App\Modules\Hotel\Application\DTOs\AddressPartsDto;

interface LocationGateway
{
    public function getAddressParts(int $wardId): ?AddressPartsDto;
}
