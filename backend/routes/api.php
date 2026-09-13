<?php

use App\Modules\Dashboard\Presentation\Http\Controllers\DashboardController;
use App\Modules\Hotel\Presentation\Controller\HotelController;
use App\Modules\User\Presentation\Http\Controllers\Admin\AdminAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Endpoint dashboard
Route::prefix('dashboard')->group(function () {
    Route::get('/stats', [DashboardController::class, 'stats']);
});

// Endpoint cho Module Hotel
Route::get('/hotels/create', [HotelController::class, 'create'])->name('hotels.create');
Route::post('/hotels', [HotelController::class, 'store'])->name('hotels.store');


// Admin
Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    // Cả admin lẫn partner đều có ability 'panel-access' sau khi login thành công
    Route::middleware(['auth:sanctum', 'ability:panel-access'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', [AdminAuthController::class, 'me']);
    });
});
