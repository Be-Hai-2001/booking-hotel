<?php

namespace App\Modules\Hotel\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoomTypeImageModel extends Model
{
    public $table = 'roomtype_images';

    protected $fillable = [
        'image_path',
        'sort_order'
    ];

    // 1 ảnh thuộc về 1 khách sạn
    public function roomType(): BelongsTo
    {
        return $this->belongsTo(RoomTypeModel::class, 'roomtype_id', 'id');
    }
}
