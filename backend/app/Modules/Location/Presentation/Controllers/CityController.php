<?php

namespace App\Modules\Location\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Hotel\Application\DTOs\PaginationDTO;
use App\Modules\Location\Application\Services\CityApplicationService;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function __construct(
        private readonly CityApplicationService $CityApplicationService
    ) {}

    public function list(Request $request)
    {
        $dto = PaginationDTO::pagination($request->pagination ?? []);

        $cities = $this->CityApplicationService->getList($dto);

        return response()->json([
            "data" => $cities
        ], 200);
    }
}
