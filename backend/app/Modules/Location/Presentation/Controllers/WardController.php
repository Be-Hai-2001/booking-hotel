<?php

namespace App\Modules\Location\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Location\Application\Services\WardApplicationService;
use App\Modules\Location\Domain\ValueObjects\CityId;
use Illuminate\Http\Request;

class WardController extends Controller
{
    public function __construct(
        public WardApplicationService $WardApplicationService
    ) {}

    public function getListByCityId(Request $request)
    {
        try {
            $cityId = new CityId($request->city_id);

            $wards = $this->WardApplicationService->list($cityId, $request->filters ?? []);

            return response()->json([
                'data' => $wards
            ], 200);
        } catch (\DomainException $e) {

            return response()->json([
                'message' => $e->getMessage()
            ], 422);
        } catch (\Throwable $th) {

            return response()->json([
                'message' => 'Đã có lỗi hệ thống xảy ra.',
                'error'   => $th->getMessage()
            ], 500);
        }
    }
}
