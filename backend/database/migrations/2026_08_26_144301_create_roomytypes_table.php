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
        Schema::create('roomytypes', function (Blueprint $table) {
            $table->id(); // Primary Key

            // Foreign Key liên kết tới bảng hotels (Xóa hotel sẽ tự xóa toàn bộ các loại phòng của hotel đó)
            $table->foreignId('hotel_id')->constrained('hotels')->cascadeOnDelete();

            $table->string('name'); // Tên loại phòng (vd: Standard Double, Deluxe Sea View...)
            $table->decimal('price', 12, 2); // Giá niêm yết phòng / đêm
            $table->decimal('extra_bed_price', 12, 2)->default(0); // Phụ phí thêm giường
            $table->string('status', 15)->default('active'); // Trạng thái (1: Đang hoạt động, 0: Ngừng bán)
            $table->timestamps(); // created_at và updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roomytypes');
    }
};
