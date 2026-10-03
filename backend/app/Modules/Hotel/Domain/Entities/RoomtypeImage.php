<?php

namespace App\Modules\Hotel\Domain\Entities;

use InvalidArgumentException;

class RoomtypeImage
{
    public function __construct(
        private ?int $id,
        private int $roomtypeId,
        private string $imagePath,
        private ?int $sortOrder,
        private ?bool $isCover,
    ) {
        // Validation nghiệp vụ: Đảm bảo dữ liệu Entity luôn hợp lệ ngay từ lúc tạo bất kể nhận từ đâu (Request, Queue Job, Command, Seeder)
        if (empty(trim($this->imagePath)))
            throw new InvalidArgumentException("Đường dẫn lưu hình ảnh không được để trống!");

        if (empty(trim($this->roomtypeId)))
            throw new InvalidArgumentException("Không được để trống mã phòng");
    }

    // --- HÀM TIỆN ÍCH (Chuyển Entity thành Mảng để trả về cho Eloquent hoặc Controller) ---
    public function toArray(): array
    {
        return [
            'id'            => $this->id,
            'roomtype_id'   => $this->roomtypeId,
            'image_path'    => $this->imagePath,
            'sort_order'    => $this->sortOrder,
            'is_cover'      => $this->isCover,
        ];
    }
}
