<?php

namespace App\Modules\User\Infrastructure\Provider;

use App\Modules\User\Domain\Repositories\AdminUserRepositoryInterface;
use App\Modules\User\Domain\Repositories\TokenGeneratorInterface;
use App\Modules\User\Infrastructure\Auth\SanctumTokenGenerator;
use App\Modules\User\Infrastructure\Persistence\Eloquent\EloquentAdminUserRepository;
use Illuminate\Support\ServiceProvider;
use Override;

final class UserServiceProvider extends ServiceProvider
{
    #[Override]
    public function register()
    {
        $this->app->bind(
            AdminUserRepositoryInterface::class,
            EloquentAdminUserRepository::class
        );

        $this->app->bind(
            TokenGeneratorInterface::class,
            SanctumTokenGenerator::class
        );
    }

    public function boot(): void
    {
        $this->loadRoutesFrom(__DIR__ . '/../../Presentation/Routes/api.php');
    }
}
