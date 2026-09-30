<?php

namespace App\Modules\Hotel\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoomTypeModel extends Model
{
    protected $table = 'room_types';

    protected $fillable = [
        'name',
        'hotel_id',
        'total_rooms',
        'price',
        'extra_bed_price',
        'status'
    ];

    // -- RelationShip room_type - hotel
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(HotelModel::class, 'hotel_id', 'id');
    }

    // -- RelationShip room_type - room_type_imange
    public function images(): HasMany
    {
        return $this->hasMany(RoomTypeImageModel::class, 'roomtype_id', 'id');
    }
}
