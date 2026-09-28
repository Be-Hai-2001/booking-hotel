<?php

namespace App\Modules\Location\Infrastructure\Provider;

use App\Modules\Location\Domain\Repositories\CityRepositoryInterface;
use App\Modules\Location\Infrastructure\Persistence\Eloquents\EloquentCityRepository;
use Illuminate\Support\ServiceProvider;
use Override;

class CityServiceProvider extends ServiceProvider
{
    /**
     * Đăng ký các binding vào DI Container
     */
    #[Override]
    public function register(): void
    {
        $this->app->bind(
            CityRepositoryInterface::class,
            EloquentCityRepository::class
        );
    }

    /**
     * Khởi chạy dịch vụ (nếu có routes/views/migrations custom)
     */
    public function boot(): void {}
}
