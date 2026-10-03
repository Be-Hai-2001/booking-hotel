<?php

namespace App\Modules\Hotel\Infrastructure\Persistence;

use App\Modules\Hotel\Domain\Entities\HotelImage;
use App\Modules\Hotel\Domain\Repositories\HotelImageRepositoryInterface;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;
use App\Modules\Hotel\Infrastructure\Persistence\Models\HotelImageModel;
use Override;

class EloquentHotelImageRepository implements HotelImageRepositoryInterface
{
    #[Override]
    public function save(HotelImage $hotelImage): HotelImage
    {
        $model = HotelImageModel::create([
            'hotel_id'   => $hotelImage->getHotelId(),
            'image_path' => $hotelImage->getImagePath(),
            'sort_order' => $hotelImage->getSortOrder(),
            'is_cover'   => $hotelImage->getIsCover(),
        ]);

        return new HotelImage(
            id: $model->id,
            hotelId: $model->hotel_id,
            imagePath: $model->image_path,
            sortOrder: $model->sort_order,
            isCover: (bool) $model->is_cover,
        );
    }

    #[Override]
    public function destroy(int $hotelImageId)
    {
        throw new \Exception('Not implemented');
    }

    public function listByHotelId(array $filter, HotelId $hotelId): array
    {
        $hotelImages = HotelImageModel::Where('hotel_id', $hotelId->value())
            ->get(
                [
                    'id',
                    'image_path',
                    'sort_order',
                    'is_cover',
                    'hotel_id'
                ]
            );
        return $hotelImages->toArray();
    }

    public function findByHotelId(): ?HotelImage
    {
        throw new \Exception('Not implemented');
    }

    public function nextOrder(int $hotelId): int
    {
        return (int) HotelImageModel::where('hotel_id', $hotelId)->max('sort_order') + 1;
    }
}
