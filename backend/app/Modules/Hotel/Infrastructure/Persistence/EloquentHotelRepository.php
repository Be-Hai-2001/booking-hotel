<?php

namespace App\Modules\Hotel\Infrastructure\Persistence;

use App\Modules\Hotel\Domain\Entities\Hotel;
use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;
use App\Modules\Hotel\Infrastructure\Persistence\Models\HotelModel;
use Override;

class EloquentHotelRepository implements HotelRepositoryInterface
{
    #[Override]
    public function findById(int $id): ?Hotel
    {
        $model = HotelModel::query()->find($id);

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
    public function delete(int $id): bool
    {
        return HotelModel::query()->where('id', $id)->delete() > 0;
    }

    // #[Override]
    // public function listHotels(?array $filters = null): array
    // {
    //     $filters ??= [];
    //     $query = HotelModel::query();

    //     foreach ($filters as $field => $value) {
    //         if ($value === null || $value === '') {
    //             continue;
    //         }

    //         if ($field === 'search') {
    //             $query->where(function ($q) use ($value) {
    //                 $q->where('hotel_name', 'like', "%{$value}%")
    //                     ->orWhere('diaChiSnapshot', 'like', "%{$value}%")
    //                     ->orWhere('diaChiChiTiet', 'like', "%{$value}%");
    //             });
    //             continue;
    //         }

    //         if (is_array($value)) {
    //             $query->whereIn($field, $value);
    //             continue;
    //         }

    //         $query->where($field, $value);
    //     }

    //     return $query->get()->map(fn(HotelModel $model) => $this->toEntity($model))->all();
    // }

    // #[Override]
    // public function listHotelsAdmin(array $filters = []): array
    // {
    //     return $this->listHotels($filters);
    // }

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
