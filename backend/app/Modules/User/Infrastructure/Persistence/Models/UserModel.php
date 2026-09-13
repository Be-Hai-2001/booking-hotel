<?php

namespace App\Modules\User\Infrastructure\Persistence\Models;

use App\Modules\User\Domain\Enums\UserRoleEnum;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

final class UserModel extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'users';

    protected $fillable = [
        'name',
        'cccd',
        'email',
        'sdt',
        'password',
        'role'
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'role' => UserRoleEnum::class,
    ];
}
