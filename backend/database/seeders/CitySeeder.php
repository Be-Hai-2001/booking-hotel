<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        $cities = [
            ['code' => '01', 'name' => 'Thành phố Hà Nội', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '04', 'name' => 'Cao Bằng', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '08', 'name' => 'Tuyên Quang', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '11', 'name' => 'Điện Biên', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '12', 'name' => 'Lai Châu', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '14', 'name' => 'Sơn La', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '15', 'name' => 'Lào Cai', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '19', 'name' => 'Thái Nguyên', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '20', 'name' => 'Lạng Sơn', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '22', 'name' => 'Quảng Ninh', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '24', 'name' => 'Bắc Ninh', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '25', 'name' => 'Phú Thọ', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '31', 'name' => 'Thành phố Hải Phòng', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '33', 'name' => 'Hưng Yên', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '37', 'name' => 'Ninh Bình', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '38', 'name' => 'Thanh Hóa', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '40', 'name' => 'Nghệ An', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '42', 'name' => 'Hà Tĩnh', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '44', 'name' => 'Quảng Trị', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '46', 'name' => 'Thành phố Huế', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '48', 'name' => 'Thành phố Đà Nẵng', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '51', 'name' => 'Quảng Ngãi', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '52', 'name' => 'Gia Lai', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '56', 'name' => 'Khánh Hòa', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '66', 'name' => 'Đắk Lắk', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '68', 'name' => 'Lâm Đồng', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '75', 'name' => 'Đồng Nai', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '79', 'name' => 'Thành phố Hồ Chí Minh', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '80', 'name' => 'Tây Ninh', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '82', 'name' => 'Đồng Tháp', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '86', 'name' => 'Vĩnh Long', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '91', 'name' => 'An Giang', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '92', 'name' => 'Thành phố Cần Thơ', 'created_at' => $now, 'updated_at' => $now],
            ['code' => '96', 'name' => 'Cà Mau', 'created_at' => $now, 'updated_at' => $now],
        ];

        // Insert vào bảng 'cities' và bỏ qua nếu trùng mã 'code'
        DB::table('cities')->insertOrIgnore($cities);
    }
}
