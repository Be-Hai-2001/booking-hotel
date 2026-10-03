<?php

namespace App\Modules\Hotel\Domain\Entities;

use InvalidArgumentException;

class HotelImage
{
    public function __construct(
        private ?int $id,
        private int $hotelId,
        private ?string $imagePath,
        private ?int $sortOrder,
        private ?bool $isCover,
    ) {
        // Validation nghiệp vụ: Đảm bảo dữ liệu Entity luôn hợp lệ ngay từ lúc tạo bất kể nhận từ đâu (Request, Queue Job, Command, Seeder)
        if (empty(trim($this->imagePath)))
            throw new InvalidArgumentException("Đường dẫn lưu hình ảnh không được để trống!");

        if (empty(trim($this->hotelId)))
            throw new InvalidArgumentException("Không được để trống mã khách sạn");
    }

    public function getHotelId(): int
    {
        return $this->hotelId;
    }
    public function getImagePath(): string
    {
        return $this->imagePath;
    }
    public function getSortOrder(): int
    {
        return $this->sortOrder;
    }
    public function getIsCover(): bool
    {
        return $this->isCover;
    }

    // --- HÀM TIỆN ÍCH (Chuyển Entity thành Mảng để trả về cho Eloquent hoặc Controller) ---
    public function toArray(): array
    {
        return [
            'id'         => $this->id,
            'hotel_id'   => $this->hotelId,
            'image_path' => $this->imagePath,
            'sort_order' => $this->sortOrder,
            'is_cover'   => $this->isCover,
        ];
    }
}
