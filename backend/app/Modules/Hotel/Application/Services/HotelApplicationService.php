<?php

namespace App\Modules\Hotel\Application\Services;

use DomainException;
use App\Modules\Hotel\Application\DTOs\CreateHotelDTO;
use App\Modules\Hotel\Application\DTOs\PaginationDTO;
use App\Modules\Hotel\Application\DTOs\UpdateHotelDTO;
use App\Modules\Hotel\Domain\Entities\Hotel;
use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;
use App\Modules\Hotel\Infrastructure\Gateways\LocalDbLocationGateway;

class HotelApplicationService
{
    public function __construct(
        private readonly HotelRepositoryInterface $hotelRepository,
        private readonly LocalDbLocationGateway $localDbLocationGateway
    ) {}

    // -- Thêm mới một khách sạn
    public function createHotel(CreateHotelDTO $dto): Hotel
    {
        // 1. Tạo địa chỉ mapping
        $parts = $this->localDbLocationGateway->getAddressParts($dto->wardId)
            ?? throw new DomainException("Xã/phường không tồn tại: {$dto->wardId}", 403);

        $pattern = '/^\s*((?:Lô|Tòa|Block|Căn hộ|Số)\s+)?([A-Za-z]{0,2}\d+[A-Za-z]?(?:[\/-]\d+[A-Za-z]?)*)/iu';
        preg_match($pattern, $dto->diaChiChiTiet, $m);
        $numberHouse = isset($m[2]) ? trim(($m[1] ?? '') . $m[2]) : null;

        $diaChiSnapshot = rtrim(implode(', ', array_filter([
            $numberHouse,
            $parts->wardName,
            $parts->cityName,
        ])), ', ');

        // 2. Dựng đối tượng Domain Entity từ DTO
        $hotel = new Hotel(
            id: null,
            userId: $dto->userId,
            wardId: $dto->wardId,
            hotelName: $dto->hotelName,
            diaChiSnapshot: $diaChiSnapshot,
            diaChiChiTiet: $dto->diaChiChiTiet,
            sdt: $dto->sdt,
            ratingTB: 0.0,
            isFloatingHotel: $dto->isFloatingHotel
        );

        // 3. Gọi Repository để lưu Entity xuống MySQL
        return $this->hotelRepository->save($hotel);
    }

    // -- Cập nhật thông tin khách sạn
    public function updateHotel(UpdateHotelDTO $dto)
    {
        // 1. Tạo địa chỉ mapping
        $parts = $this->localDbLocationGateway->getAddressParts($dto->wardId)
            ?? throw new DomainException("Xã/phường không tồn tại: {$dto->wardId}", 403);

        $pattern = '/^\s*((?:Lô|Tòa|Block|Căn hộ|Số)\s+)?([A-Za-z]{0,2}\d+[A-Za-z]?(?:[\/-]\d+[A-Za-z]?)*)/iu';
        preg_match($pattern, $dto->diaChiChiTiet, $m);
        $numberHouse = isset($m[2]) ? trim(($m[1] ?? '') . $m[2]) : null;

        $diaChiSnapshot = rtrim(implode(', ', array_filter([
            $numberHouse,
            $parts->wardName,
            $parts->cityName,
        ])), ', ');

        // 2. Lấy chủ khách sạn
        $existing = $this->hotelRepository->getById($dto->hotelId);

        // 3. Dựng Domain Entity từ DTO, userId lấy từ DB
        $hotel = new Hotel(
            id: $dto->hotelId->value(),
            userId: $existing['user_id'],
            wardId: $dto->wardId,
            hotelName: $dto->hotelName,
            diaChiSnapshot: $diaChiSnapshot,
            diaChiChiTiet: $dto->diaChiChiTiet,
            sdt: $dto->sdt,
            ratingTB: 0.0,
            isFloatingHotel: $dto->isFloatingHotel,
            status: $dto->status,
        );

        return $this->hotelRepository->save($hotel);
    }

    // -- Xóa mềm khách sạn
    public function deleteHotel(HotelId $id): bool
    {
        // dd($id);
        $hotel = $this->hotelRepository->delete($id);

        return $hotel;
    }

    // Lấy danh sách khách sạn theo user_id
    public function getHotelsByOwnerId(int $ownerId, PaginationDTO $dto): array
    {
        return $this->hotelRepository->getByOwnerId(
            $ownerId,
            (array) $dto
        );
    }

    public function getList(PaginationDTO $dto): array
    {
        return $this->hotelRepository->list((array) $dto);
    }

    // -- Lấy thông tin khách sạn theo mã khách sạn
    public function getHotelById(HotelId $id)
    {
        return $this->hotelRepository->getById($id);
    }
}
