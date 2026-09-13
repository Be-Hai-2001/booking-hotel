<?php

namespace App\Modules\User\Infrastructure\Auth;

use App\Modules\User\Domain\Repositories\TokenGeneratorInterface;
use App\Modules\User\Infrastructure\Persistence\Models\UserModel;
use Override;
use RuntimeException;

final class SanctumTokenGenerator implements TokenGeneratorInterface
{
    #[Override]
    public function generateForUserId(int $userId, array $abilities = ['*'], string $tokenName = 'access-token'): string
    {
        $model = UserModel::query()->find($userId);

        if ($model === null) throw new RuntimeException("User #{$userId} không tồn tại để sinh token.");

        return $model->createToken($tokenName, $abilities)->plainTextToken;
    }
}
