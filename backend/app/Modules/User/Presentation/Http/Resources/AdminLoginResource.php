<?php

// declare(strict_types=1);

namespace App\Modules\User\Presentation\Http\Resources;

use App\Modules\User\Application\DTOs\LoginUserAdminResultDTO;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

final class AdminLoginResource extends JsonResource
{
    public function __construct(private readonly LoginUserAdminResultDTO $output)
    {
        parent::__construct($output);
    }

    public function toArray(Request $request): array
    {
        return [
            'user' => [
                'id' => $this->output->id,
                'email' => $this->output->email,
                'role' => $this->output->role,
            ],
            'access_token' => $this->output->accessToken,
            'token_type' => $this->output->tokenType,
        ];
    }
}
