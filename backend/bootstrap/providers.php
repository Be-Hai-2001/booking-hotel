<?php

use App\Modules\Hotel\Infrastructure\Provider\HotelServiceProvider;
use App\Modules\User\Infrastructure\Provider\UserServiceProvider;
use App\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,
    // Các service provider khác của ứng dụng có thể được thêm vào đây
    HotelServiceProvider::class,
    UserServiceProvider::class
];
