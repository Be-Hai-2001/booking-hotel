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
        Schema::create('cities', function (Blueprint $table) {
            $table->id(); // Primary Key (bigint auto-increment)
            $table->string('code')->unique(); // Mã hành chính tỉnh/thành (ví dụ: '01', '79')
            $table->string('name'); // Tên Tỉnh/Thành phố (ví dụ: 'Thành phố Hà Nội', 'TP. Hồ Chí Minh')
            $table->string('status', 15)->default('active');
            $table->timestamps(); // Tạo 2 cột created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
