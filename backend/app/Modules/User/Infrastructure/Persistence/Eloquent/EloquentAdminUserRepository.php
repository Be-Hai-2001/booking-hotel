<?php

declare(strict_types=1);

namespace App\Modules\User\Infrastructure\Persistence\Eloquent;

use App\Modules\User\Domain\Entities\User;
use App\Modules\User\Domain\Repositories\AdminUserRepositoryInterface;
use App\Modules\User\Infrastructure\Persistence\Models\UserModel;

final class EloquentAdminUserRepository implements AdminUserRepositoryInterface
{
    public function findByLoginIdentifier(string $identifier): ?User
    {
        $model = UserModel::query()
            ->where('email', $identifier)
            ->orWhere('sdt', $identifier)
            ->first();

        if ($model === null) {
            return null;
        }

        return $this->toEntity($model);
    }

    private function toEntity(UserModel $model): User
    {
        return new User(
            id: (int) $model->id,
            name: $model->name,
            cccd: $model->cccd,
            email: $model->email,
            sdt: $model->sdt,
            password: $model->password,
            role: $model->role,
        );
    }
}
