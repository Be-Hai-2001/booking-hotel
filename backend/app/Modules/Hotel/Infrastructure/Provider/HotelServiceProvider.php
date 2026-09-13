<?php

namespace App\Modules\Hotel\Infrastructure\Provider;

use App\Modules\Hotel\Domain\Repositories\HotelRepositoryInterface;
use App\Modules\Hotel\Infrastructure\Persistence\EloquentHotelRepository;
use Illuminate\Support\ServiceProvider;

/**
 * Đăng ký các binding vào DI Container
 */

class HotelServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(
            HotelRepositoryInterface::class,
            EloquentHotelRepository::class
        );
    }

    /**
     * Khởi chạy dịch vụ (nếu có routes/views/migrations custom)
     */
    public function boot(): void
    {
        // Thực hiện các hành động khi ứng dụng khởi động, nếu cần
    }
}
