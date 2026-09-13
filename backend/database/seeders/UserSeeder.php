<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //      $table->string('name');
        // $table->string('cccd', 20)->nullable(); // Bổ sung CCCD
        // $table->string('email')->unique();
        // $table->string('sdt', 20)->nullable();  // Bổ sung Số điện thoại
        // $table->timestamp('email_verified_at')->nullable();
        // $table->string('password');
        // $table->boolean('role')->default(false);
        $now = Carbon::now();

        $users = [
            [
                'name' => 'Minh Hải',
                'cccd' => '08720100417',
                'email' => 'haiminhhminh2001@gmail.com',
                'sdt' => '0985023701',
                'password' => Hash::make('Haiminh2@@1'),
                'role' => 'admin'
            ],
            [
                'name' => 'Gia Huy',
                'cccd' => '08720100418',
                'email' => 'giahuy2001@gmail.com',
                'sdt' => '0985023702',
                'password' => Hash::make('123456789'),
                'ro
                le' => 'partner'
            ],
            [
                'name' => 'Minh Ngọc',
                'cccd' => '08720100444',
                'email' => 'minhngoc2000@gmail.com',
                'sdt' => '0985023703',
                'password' => Hash::make('Haiminh2@@1'),
                'role' => 'admin'
            ]
        ];

        DB::table('users')->insertOrIgnore($users);
    }
}
