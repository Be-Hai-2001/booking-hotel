<?php

namespace App\Modules\Hotel\Infrastructure\Persistence;

use App\Modules\Hotel\Domain\Entities\Hotel;
use App\Modules\Hotel\Domain\Enums\HotelStatus;
use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;
use App\Modules\Hotel\Infrastructure\Persistence\Models\HotelModel;
use Override;

class EloquentHotelRepository implements HotelRepositoryInterface
{
    #[Override]
    public function findById(HotelId $id): ?Hotel
    {
        $model = HotelModel::query()->find($id->value());
        return $model ? $this->toEntity($model) : null;
    }

    #[Override]
    public function save(Hotel $hotel): Hotel
    {
        // 1. Chuyển Entity thành mảng
        $data = $hotel->toArray();
        // 2. Insert nếu chưa có ID, Update nếu đã có ID
        $model = HotelModel::updateOrCreate(
            ['id' => $hotel->getId()],
            $data
        );
        // 3. Map ngược về Entity và trả về
        return $this->toEntity($model);
    }

    #[Override]
    public function delete(HotelId $id): bool
    {
        return HotelModel::findOrFail($id->value())->delete();
    }

    // -- Lấy danh sách khách sạn thuộc chủ sở hữu khách sạn theo Token user_id
    #[Override]
    public function getByOwnerId(int $ownerId, ?array $filters = null): array
    {
        $hotels = HotelModel::where('user_id', $ownerId)
            // ->whereNot('status', HotelStatus::INACTIVE->value)
            ->get();

        return $hotels->toArray();
    }

    #[Override]
    public function list(?array $filters = null): array
    {
        $hotels = HotelModel::all();
        return $hotels->toArray();
    }

    // -- Lấy thông tin khách sạn theo khóa chính
    #[Override]
    public function getById(HotelId $id)
    {
        return HotelModel::with('images')->find($id->value())->toArray();
    }

    /**
     * Hàm tiện ích: Biến Eloquent Model thành Domain Entity
     */
    private function toEntity(HotelModel $model): Hotel
    {
        return new Hotel(
            id: $model->id,
            userId: $model->user_id,
            wardId: $model->ward_id,
            hotelName: $model->hotel_name,
            diaChiSnapshot: $model->diaChiSnapshot,
            diaChiChiTiet: $model->diaChiChiTiet,
            sdt: $model->sdt,
            ratingTB: (float) $model->ratingTB,
            isFloatingHotel: (bool) $model->is_floating_hotel
        );
    }
}
