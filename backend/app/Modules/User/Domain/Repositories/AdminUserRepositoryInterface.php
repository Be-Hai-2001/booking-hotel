<?php

namespace App\Modules\User\Domain\Repositories;

use App\Modules\User\Domain\Entities\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Http\JsonResponse;

interface AdminUserRepositoryInterface
{

    public function findByLoginIdentifier(string $identifier): ?User;

    // public function logout(Request $request): JsonResponse;
}
