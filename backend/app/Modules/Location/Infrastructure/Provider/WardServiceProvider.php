<?php

namespace App\Modules\Location\Infrastructure\Provider;

use App\Modules\Location\Domain\Repositories\WardRepositoryInterface;
use App\Modules\Location\Infrastructure\Persistence\Eloquents\EloquentWardRepository;
use Illuminate\Support\ServiceProvider;
use Override;

class WardServiceProvider extends ServiceProvider
{
    #[Override]
    public function register(): void
    {
        $this->app->bind(
            WardRepositoryInterface::class,
            EloquentWardRepository::class
        );
    }

    public function boot() {}
}
