<?php

namespace App\Modules\Hotel\Application\Services;

use App\Modules\Hotel\Application\DTOs\ImageDto;
use App\Modules\Hotel\Domain\Entities\HotelImage;
use App\Modules\Hotel\Domain\Repositories\HotelImageRepositoryInterface;
use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;

class HotelImageApplicationService
{
    public function __construct(
        public HotelRepositoryInterface $hotelRepositoryInterface,
        public HotelImageRepositoryInterface $hotelImageRepositoryInterface
    ) {}

    public function upload(HotelId $hotelId, ImageDto $dto): array
    {
        $this->assertCanManage($hotelId, $dto->userId, $dto->isPartner);
        $result = [];
        foreach ($dto->files['images'] as $file) {
            $path = $file->store("hotels/{$hotelId->value()}", 'public');
            $result[] = $this->hotelImageRepositoryInterface->save(
                new HotelImage(
                    id: null,
                    hotelId: $hotelId->value(),
                    imagePath: $path,
                    sortOrder: $dto->sortOder ?? $this->hotelImageRepositoryInterface->nextOrder($hotelId->value()),
                    isCover: $dto->isCover ?? false
                )
            );
        }
        return $result;
    }

    public function listByHotelId(array $filter, HotelId $id)
    {
        return $this->hotelImageRepositoryInterface->listByHotelId($filter, $id);
    }

    // -- funtion kiểm tra có phải là user_partner thao tác hay không
    private function assertCanManage(HotelId $hotelId, int $userId, bool $isPartner)
    {
        $hotel = $this->hotelRepositoryInterface->findById($hotelId);
        if (!$hotel) {
            throw new \DomainException('Không tìm thấy khách sạn', 404);
        }
        // Đổi tên getter cho khớp entity Hotel của bạn
        if (!$isPartner && $hotel->userId !== $userId) {
            throw new \DomainException('Bạn không có quyền với khách sạn này', 403);
        }
    }
}
