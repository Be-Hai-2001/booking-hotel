<?php

namespace App\Modules\User\Domain\Repositories;

interface TokenGeneratorInterface
{
    /**
     * Sinh access token cho user, trả về plain text token.
     *
     * @param string[] $abilities Danh sách ability gắn vào token (vd: ['panel-access', 'admin'])
     */

    public function generateForUserId(int $userId, array $abilities = ['*'], string $tokenName = 'access-token'): string;
}
