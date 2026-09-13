<?php

namespace App\Modules\Hotel\Domain\Entities;

use InvalidArgumentException;

/*
-> Nơi khai báo tất cả các thuộc tính thuộc hotel, là đại diện cho đối tượng khách sạn 
*/

class Hotel
{
    public function __construct(
        private ?int $id,
        private int $userId,
        private int $wardId,
        private string $hotelName,
        private string $diaChiSnapshot,
        private ?string $diaChiChiTiet = null,
        private ?string $sdt = null,
        private float $ratingTB = 0.0,
        private bool $isFloatingHotel = false
    ) {
        // Validation nghiệp vụ: Đảm bảo dữ liệu Entity luôn hợp lệ ngay từ lúc tạo bất kể nhận từ đâu (Request, Queue Job, Command, Seeder)
        if (empty(trim($this->hotelName))) {
            throw new InvalidArgumentException("Tên khách sạn không được để trống!");
        }
    }

    // --- CÁC HÀM GETTER (Để lấy dữ liệu ra ngoài) ---
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getUserId(): int
    {
        return $this->userId;
    }
    public function getWardId(): int
    {
        return $this->wardId;
    }
    public function getHotelName(): string
    {
        return $this->hotelName;
    }
    public function getDiaChiChiTiet(): ?string
    {
        return $this->diaChiChiTiet;
    }
    public function getDiaChiSnapshot(): string
    {
        return $this->diaChiSnapshot;
    }
    public function getSdt(): ?string
    {
        return $this->sdt;
    }
    public function getRatingTB(): float
    {
        return $this->ratingTB;
    }
    public function isFloatingHotel(): bool
    {
        return $this->isFloatingHotel;
    }

    // --- HÀM TIỆN ÍCH (Chuyển Entity thành Mảng để trả về cho Eloquent hoặc Controller) ---
    public function toArray(): array
    {
        return [
            'id'                => $this->id,
            'user_id'           => $this->userId,
            'ward_id'           => $this->wardId,
            'hotel_name'        => $this->hotelName,
            'diaChiChiTiet'     => $this->diaChiChiTiet,
            'diaChiSnapshot'    => $this->diaChiSnapshot,
            'sdt'               => $this->sdt,
            'ratingTB'          => $this->ratingTB,
            'is_floating_hotel' => $this->isFloatingHotel,
        ];
    }
}
