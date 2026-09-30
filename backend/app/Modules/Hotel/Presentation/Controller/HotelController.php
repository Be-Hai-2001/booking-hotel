<?php

namespace App\Modules\Hotel\Presentation\Controller;

use App\Http\Controllers\Controller;
use App\Modules\Hotel\Application\DTOs\CreateHotelDTO;
use App\Modules\Hotel\Application\DTOs\PaginationDTO;
use App\Modules\Hotel\Application\DTOs\UpdateHotelDTO;
use App\Modules\Hotel\Application\Services\HotelApplicationService;
use App\Modules\Hotel\Domain\Entities\Hotel;
use App\Modules\Hotel\Domain\ValueObjects\HotelId;
use App\Modules\Hotel\Presentation\Http\Requests\StoreHotelRequest;
use App\Modules\User\Domain\Enums\UserRole;
use Exception;
use Illuminate\Http\Request;

class HotelController extends Controller
{
    public function __construct(

        private readonly HotelApplicationService $hotelService
    ) {}

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
        try {
            // 1. Lấy user ID của người dùng đang đăng nhập từ Auth
            $userId = $request->user()->id;

            // if ($request->user()->role->value !== UserRole::PARTNER->value)
            //     throw new \RuntimeException('User không có quyền thao tác');

            // 2. Chuyển đổi dữ liệu từ request sang DTO
            $dto = CreateHotelDTO::fromRequest(
                $request->validated(),
                $userId
            );

            // 3. Gọi service để tạo khách sạn
            $hotel = $this->hotelService->createHotel($dto);
            // 4. Trả về phản hồi (response) cho client

            return response()->json([
                'message' => 'SUCCESS',
                'hotel' => $hotel->toArray(),
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // Lấy danh sách khách sạn theo phân quyền chủ khách sạn
    public function getMyHotels(Request $request)
    {
        try {

            // 1. Lấy userId trực tiếp từ Auth Token đã xác thực
            $userId = $request->user()->id;

            $dto = PaginationDTO::pagination($request->pagination ?? []);

            if ($userId == null)
                throw new Exception("Không tìm thấy dữ liệu đối tác");

            // Gọi Application Service xử lý nghiêp vụ
            $hotels = $this->hotelService->getHotelsByOwnerId(
                $userId,
                $dto
            );

            return response()->json([
                'success' => true,
                'data' => $hotels
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    // Lấy danh sách khách sạn
    public function list(Request $request)
    {
        $dto = PaginationDTO::pagination($request->pagination ?? []);
        $hotels = $this->hotelService->getList($dto);

        return response()->json([
            'success' => true,
            'data' => $hotels
        ], 200);
    }

    // -- Lấy thông tin khách sạn theo id khách sạn
    public function show(Request $request, int $id)
    {
        $hotelId = new HotelId($id);

        try {
            $hotel = $this->hotelService->getHotelById($hotelId);

            return response()->json([
                'success' => true,
                'data' => $hotel
            ], 200);
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    // -- Cập nhật thông tin khách sạn
    public function update(StoreHotelRequest $request, int $id)
    {
        try {
            $dto = UpdateHotelDTO::fromRequest($request->toArray(), new HotelId($id));

            $hotel = $this->hotelService->updateHotel($dto);
            return response()->json([
                'success' => true,
                'data' => $hotel->toArray()
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function destroy(Request $request, int $id)
    {
        $status = $this->hotelService->deleteHotel(new HotelId($id));

        return response()->json([
            'success' => $status
        ], 204);
    }
}
