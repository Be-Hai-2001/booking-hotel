<?php

namespace App\Modules\Hotel\Infrastructure\Persistence\Models;

use App\Modules\Hotel\Domain\Enums\HotelStatus;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/*
-> Nơi định nghĩa giao tiếp với các row trong database
*/

class HotelModel extends Model
{
    use SoftDeletes;

    protected $table = 'hotels';

    protected $fillable = [
        'user_id',
        'ward_id',
        'hotel_name',
        'diaChiChiTiet',
        'diaChiSnapshot',
        'sdt',
        'ratingTB',
        'is_floating_hotel',
        'status'
    ];

    // Tự động cast kiểu dữ liệu 0/1 ở DB thành true/false trong PHP
    protected $casts = [
        'is_floating_hotel' => 'boolean',
        'ratingTB'          => 'float',
        'status' => HotelStatus::class,
    ];

    protected $appends = ['status_label'];

    protected function statusLabel(): Attribute
    {
        return Attribute::get(fn() => $this->status->label());
    }

    // -- RelationShip hotel - hotelImage
    public function images(): HasMany
    {
        return $this->hasMany(HotelImageModel::class, 'hotel_id', 'id');
    }

    // -- RelationShip hotel - roomtype
    public function roomTypes(): HasMany
    {
        return $this->hasMany(RoomTypeModel::class, 'hotel_id', 'id');
    }
}
