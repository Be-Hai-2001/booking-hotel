<?php

declare(strict_types=1);

namespace App\Modules\User\Presentation\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Modules\User\Application\DTOs\LoginUserAdminDTO;
use App\Modules\User\Application\Services\AdminLoginService;
use App\Modules\User\Presentation\Http\Requests\AdminLoginRequest;
use App\Modules\User\Presentation\Http\Resources\AdminLoginResource;
use DomainException;
use Illuminate\Http\JsonResponse;
use RuntimeException;

final class AdminAuthController extends Controller
{
    public function __construct(private readonly AdminLoginService $adminLoginService) {}

    // Đăng nhập
    public function login(AdminLoginRequest $request): JsonResponse
    {
        $input = LoginUserAdminDTO::fromArray($request->validated());

        try {
            $output = $this->adminLoginService->handle($input);
        } catch (RuntimeException | DomainException $e) {
            return response()->json(
                ['message' => $e->getMessage()],
                $e->getCode() ?: 400,
            );
        }

        return (new AdminLoginResource($output))
            ->response()
            ->setStatusCode(200);
    }

    public function logout(): JsonResponse
    {
        /** @var \App\Modules\User\Infrastructure\Persistence\Models\UserModel|null $user */
        $user = auth('sanctum')->user();
        /** @var \Laravel\Sanctum\PersonalAccessToken|null $token */
        $token = $user?->currentAccessToken();
        $token?->delete();

        return response()->json(['message' => 'Đăng xuất thành công.']);
    }

    public function me(): JsonResponse
    {
        $user = auth('sanctum')->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role->value,
        ]);
    }
}
