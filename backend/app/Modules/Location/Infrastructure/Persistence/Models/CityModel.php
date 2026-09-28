<?php

namespace App\Modules\Location\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;

class CityModel extends Model
{
    protected $table = 'cities';

    protected $fillable = [
        'code',
        'name',
        'status'
    ];
}
