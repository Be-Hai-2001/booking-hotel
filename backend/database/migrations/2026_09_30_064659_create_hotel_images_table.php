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
        Schema::create('hotel_images', function (Blueprint $table) {
            $table->id();
            // Foreign key referencing hotels table
            $table->foreignId('hotel_id')->constrained('hotels')->cascadeOnDelete();
            $table->longText('image_path');                 // Đường dẫn / URL hình ảnh
            $table->integer('sort_order')->default(0);  // Thứ tự hiển thị hình ảnh
            $table->boolean('is_cover')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotel_images');
    }
};
