<?php

namespace App\Modules\Dashboard\Presentation\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Dashboard\Application\Services\DashboardApplicationService;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Inject DashboardApplicationService để lấy dữ liệu thống kê
     */
    public function __construct(
        private readonly DashboardApplicationService $dashboardService
    ) {}

    /**
     * Get thống kê tổng quan Dashboard
     */
    public function stats(): JsonResponse
    {
        $stats = $this->dashboardService->getStats();

        return response()->json([
            'message' => 'Lấy thông tin thống kê Dashboard thành công!',
            'data' => $stats->toArray()
        ], 200);
    }
}
