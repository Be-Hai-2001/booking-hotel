<?php

namespace App\Modules\Hotel\Infrastructure\Persistence\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class HotelImageModel extends Model
{
    public $table = 'hotel_images';

    protected $fillable = [
        'image_path',
        'sort_order',
        'is_cover',
        'hotel_id'
    ];

    protected $casts = ['is_cover' => 'boolean'];

    protected $appends = ['url']; // Tự thêm thuộc tính url vào JSON/array khi trả model ra, dù url không phải cột trong DB.


    // 1 ảnh thuộc về 1 khách sạn
    public function hotel(): BelongsTo
    {
        return $this->belongsTo(HotelModel::class, 'hotel_id', 'id');
    }

    public function getUrlAttribute(): string
    {
        if (!$this->image_path)
            return '';


        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('public');

        return $disk->url($this->image_path);
    }
}
