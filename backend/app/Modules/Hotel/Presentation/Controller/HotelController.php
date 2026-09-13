<?php

namespace App\Modules\Hotel\Presentation\Controller;

use App\Http\Controllers\Controller;
use App\Modules\Hotel\Application\DTOs\CreateHotelDTO;
use App\Modules\Hotel\Application\Services\HotelApplicationService;
use App\Modules\Hotel\Presentation\Http\Requests\StoreHotelRequest;

class HotelController extends Controller
{
    public function __construct(

        private readonly HotelApplicationService $hotelService
    ) {}

    /**
     * UI trả về form thêm mới khách sạna   
     * HTTP method: GET
     */

    public function create()
    {
        return view('hotel.create');
    }

    /**
     * Thêm mới khách sạn
     * @param StoreHotelRequest 
     * $request :
     * {
     *   "hotel_name": txt,
     *   "ward_id": int,
     *   "diaChiChiTiet": txt,
     *   "diaChiSnapshot": txt,
     *   "sdt": string,
     *   "is_floating_hotel": boolean
     *  }
     * HTTP method: POST
     * @return \Illuminate\Http\JsonResponse
     */

    public function store(StoreHotelRequest $request)
    {
        // 1. Lấy user ID của người dùng đang đăng nhập từ Auth
        // $userId = $request->user()->id ?? throw new \RuntimeException('Không tìm thấy user ID từ Auth Token');

        // Text nhanh trên postman khi chưa có Auth -> lấy user mặc định thứ nhất trong seeder
        $userId = $request->user()->id ?? 1;

        // 2. Chuyển đổi dữ liệu từ request sang DTO
        $dto = CreateHotelDTO::fromRequest(
            $request->validated(),
            $userId
        );

        // 3. Gọi service để tạo khách sạn
        $hotel = $this->hotelService->createHotel($dto);
        // 4. Trả về phản hồi (response) cho client
        return response()->json([
            'message' => 'Thêm mới khách sạn thành công!',
            'hotel' => $hotel->toArray(),
        ], 201);
    }
}
