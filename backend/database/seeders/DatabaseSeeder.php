<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Khai báo theo cấu trúc khoas chính -> khóa ngoại
        $this->call([
            // 1. Địa danh (Thành phố tạo trước, Phường/Xã tạo sau)
            CitySeeder::class,
            WardSeeder::class,

            // 2. Người dùng
            UserSeeder::class


        ]);
    }
}
