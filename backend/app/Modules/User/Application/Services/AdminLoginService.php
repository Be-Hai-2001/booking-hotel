<?php


namespace App\Modules\User\Application\Services;

use App\Modules\User\Application\DTOs\LoginUserAdminDTO;
use App\Modules\User\Application\DTOs\LoginUserAdminResultDTo;
use App\Modules\User\Domain\Repositories\AdminUserRepositoryInterface;
use App\Modules\User\Domain\Repositories\TokenGeneratorInterface;
use DomainException;
use Illuminate\Support\Facades\Hash;
use RuntimeException;

final class AdminLoginService
{
    public function __construct(
        private readonly AdminUserRepositoryInterface $userRepository,
        private readonly TokenGeneratorInterface $tokenGenerator
    ) {}

    public function handle(LoginUserAdminDTO $input): LoginUserAdminResultDTO
    {
        $user = $this->userRepository->findByLoginIdentifier($input->identifier);

        if ($user === null || !Hash::check($input->password, $user->password))
            throw new RuntimeException('Email hoặc mật khẩu không đúng', 401);

        // Riêng ability theo role dùng để phân quyền chi tiết ở từng endpoint.
        $abilities = ['panel-access', $user->role->value];

        $accessToken = $this->tokenGenerator->generateForUserId($user->id, $abilities);

        return new LoginUserAdminResultDTo(
            id: $user->id,
            email: $user->email,
            sdt: $user->sdt,
            role: $user->role->value,
            accessToken: $accessToken,
        );
    }
}
