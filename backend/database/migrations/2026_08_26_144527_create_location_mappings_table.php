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
        Schema::create('location_mappings', function (Blueprint $table) {
            $table->id(); // Primary Key

            $table->string('old_code'); // Mã hành chính cũ của Phường/Xã trước khi sáp nhập/thay đổi

            // Foreign Key tham chiếu đến ID của Phường/Xã mới trong bảng wards
            $table->foreignId('new_ward_id')->constrained('wards')->cascadeOnDelete();
            $table->date('effective_date'); // Ngày quyết định sáp nhập/thay đổi có hiệu lực
            $table->timestamps(); // created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_mappings');
    }
};
