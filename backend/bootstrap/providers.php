<?php

use App\Modules\Hotel\Infrastructure\Provider\HotelServiceProvider;
use App\Modules\Location\Infrastructure\Provider\CityServiceProvider;
use App\Modules\Location\Infrastructure\Provider\WardServiceProvider;
use App\Modules\User\Infrastructure\Provider\UserServiceProvider;
use App\Providers\AppServiceProvider;

return [
    AppServiceProvider::class,
    // Các service provider khác của ứng dụng có thể được thêm vào đây
    HotelServiceProvider::class,
    UserServiceProvider::class,
    CityServiceProvider::class,
    WardServiceProvider::class
];
