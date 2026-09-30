<?php

namespace App\Modules\Hotel\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HotelImageModel extends Model
{
    public $table = 'hotel_images';

    protected $fillable = [
        'image_path',
        'sort_order'
    ];

    // 1 ảnh thuộc về 1 khách sạn
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(HotelModel::class, 'hotel_id', 'id');
    }
}
