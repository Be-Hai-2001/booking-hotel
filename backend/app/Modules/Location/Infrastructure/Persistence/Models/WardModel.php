<?php

namespace App\Modules\Location\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;

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
}
