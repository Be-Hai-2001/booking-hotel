<?php

namespace App\Modules\Hotel\Infrastructure\Persistence;

use App\Modules\Hotel\Domain\Repositories\RoomtypeImageRepositoryInterface;
use Override;

class EloquentRoomtypeImageRepository implements RoomtypeImageRepositoryInterface
{
    #[Override]
    public function save()
    {
        throw new \Exception('Not implemented');
    }

    #[Override]
    public function destroy()
    {
        throw new \Exception('Not implemented');
    }
}
