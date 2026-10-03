<?php

namespace App\Modules\Hotel\Presentation\Controller;

use App\Http\Controllers\Controller;
use App\Modules\Hotel\Application\DTOs\ImageDto;
use App\Modules\Hotel\Application\Services\HotelImageApplicationService;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;
use App\Modules\Hotel\Presentation\Http\Requests\StoreImageRequest;
use App\Modules\Hotel\Presentation\Http\Requests\UploadImagesRequest;
use App\Shared\Enums\UserRole;
use Illuminate\Http\Request;

class HotelImageController extends Controller
{
    public function __construct(
        public HotelImageApplicationService $hotelImageApplicationService
    ) {}

    public function store(UploadImagesRequest $request, int $id)
    {
        $user = $request->user();
        $dto = ImageDto::fromRequest([
            'user_id'       => $user->id,
            'is_partner'    => $user->role === UserRole::PARTNER,
            'files'         => $request->validated(),
        ]);

        try {
            $images = $this->hotelImageApplicationService->upload(
                new HotelId($id),
                $dto
            );

            return response()->json([
                'success' => true,
                'data'    => $images
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error'    => $th
            ], 500);
        }
    }

    public function list(Request $request, int $id)
    {
        try {
            $images = $this->hotelImageApplicationService->listByHotelId([], new HotelId($id));

            return response()->json([
                'success' => true,
                'data'    => $images
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error'    => $th
            ], 500);
        }
    }
}
