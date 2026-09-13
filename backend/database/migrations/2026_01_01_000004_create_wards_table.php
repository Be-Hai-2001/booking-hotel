<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wards', function (Blueprint $table) {
            $table->id(); // Primary Key

            // Foreign Key liên kết tới bảng provinces (xóa tỉnh sẽ tự xóa các phường/xã thuộc tỉnh đó)
            $table->foreignId('city_id')->constrained('cities')->cascadeOnDelete();

            $table->string('code'); // Mã hành chính của phường/xã (ví dụ: '00001', '26734')
            $table->string('name'); // Tên Phường/Xã/Thị trấn
            $table->date('valid_from')->nullable(); // Ngày bắt đầu áp dụng mã hành chính này
            $table->string('status', 15)->default('active');

            $table->timestamps(); // created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wards');
    }
};
