<?php

namespace App\Modules\Location\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WardModel extends Model
{
    protected $table = 'wards';

    protected $fillable = [
        'city_id',
        'code',
        'name',
        'valid_from',
        'status'
    ];

    // -- RelationShip ward - city
    public function city(): BelongsTo
    {
        return $this->belongsTo(CityModel::class, 'city_id', 'id');
    }
}
