<?php

namespace App\Modules\Hotel\Infrastructure\Gateways;

use App\Modules\Hotel\Application\Contracts\LocationGateway;
use App\Modules\Hotel\Application\DTOs\AddressPartsDto;
use Illuminate\Support\Facades\DB;
use Override;

class LocalDbLocationGateway implements LocationGateway
{
    #[Override]
    public function getAddressParts(int $wardId): ?AddressPartsDto
    {
        $db = DB::table('wards')
            ->join('cities', 'wards.city_id', '=', 'cities.id')
            ->where('wards.id', $wardId)
            ->first([
                'wards.name as ward_name',
                'cities.name as city_name',
            ]);

        return $db
            ?
            new AddressPartsDto(
                wardName: $db->ward_name,
                cityName: $db->city_name
            )
            :
            null;
    }
}
