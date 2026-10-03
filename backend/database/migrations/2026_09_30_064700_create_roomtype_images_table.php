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
        Schema::create('roomtype_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('roomtype_id')->constrained('roomtypes')->cascadeOnDelete();
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
        Schema::dropIfExists('roomtype_images');
    }
};
