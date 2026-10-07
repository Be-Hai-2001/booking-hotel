<?php

use App\Modules\Dashboard\Presentation\Http\Controllers\DashboardController;
use App\Modules\Hotel\Presentation\Controller\HotelController;
use App\Modules\Hotel\Presentation\Controller\HotelImageController;
use App\Modules\Location\Presentation\Controllers\CityController;
use App\Modules\Location\Presentation\Controllers\WardController;
use App\Modules\User\Presentation\Http\Controllers\Admin\AdminAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// -- 1. API xem tài khoản đăng nhập 
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// -- api dùng chung (public)
Route::prefix('dashboard')->group(function () {
    Route::get('/stats', [DashboardController::class, 'stats']);
});

// -- KHÁCH SẠN
Route::prefix('hotels')->group(function () {
    Route::get('/', [HotelController::class, 'list'])->name('hotels.list');
    Route::get('/{hotel_id}', [HotelController::class, 'show'])->name('hotels.detail');

    Route::get('/{id}/images', [HotelImageController::class, 'list'])->name('list_img_hotel');
});


// -- api cho PARTNER
Route::prefix('partner')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    // Cả admin lẫn partner đều có ability 'panel-access' sau khi login thành công
    Route::middleware(['auth:sanctum', 'ability:panel-access'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', [AdminAuthController::class, 'me']);

        // Route::post('/hotel', [HotelController::class, 'store'])->name('hotels.store');
        // Route::get('/hotels', [HotelController::class, 'getMyHotels'])->name('hotels.hotels');

        // Quản lý Khách sạn (Partner)
        Route::prefix('hotels')->name('hotels.')->group(function () {

            // -- HotelImageController
            Route::post('/{id}/images', [HotelImageController::class, 'store'])->name('upload_img_hotel'); // partner/hotels/{id}
            Route::delete('/images', [HotelImageController::class, 'deleteList'])->name('delete_img_hotel'); // partner/hotels/{id}

            // -- HotelController
            Route::get('/', [HotelController::class, 'getMyHotels'])->name('index'); // partner/hotels
            Route::post('/', [HotelController::class, 'store'])->name('store');       // partner/hotels
            Route::get('/{id}', [HotelController::class, 'show'])->name('show');       // partner/hotels/{id}
            Route::put('/{id}', [HotelController::class, 'update'])->name('update');   // partner/hotels/{id}
            Route::delete('/{id}', [HotelController::class, 'destroy'])->name('destroy'); // partner/hotels/{id}
        });
    });
});

// route public
Route::prefix('location')->group(function () {

    // -- Thành phố
    Route::prefix('cities')->group(function () {
        Route::get('/', [CityController::class, 'list']);
    });

    // -- phường/xã
    Route::prefix('wards')->group(function () {
        Route::get('/city/{city_id}', [WardController::class, 'getListByCityId']);
        Route::get('/{ward_id}', [WardController::class, 'getListByWardId']);
    });
});
