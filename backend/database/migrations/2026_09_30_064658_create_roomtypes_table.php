<?php

use App\Modules\Hotel\Domain\Enums\RoomTypeStatus;
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
        Schema::create('roomtypes', function (Blueprint $table) {
            $table->id();
            // Khóa ngoại trỏ đến bảng hotels (xóa khách sạn tự động xóa các loại phòng tương ứng)
            $table->foreignId('hotel_id')->constrained('hotels')->cascadeOnDelete();
            $table->string('name');
            $table->integer('total_rooms')->default(1);
            $table->decimal('price', 12, 2)->default(0.00);             // Giá niêm yết
            $table->decimal('extra_bed_price', 12, 2)->default(0.00);   // Phụ phí kê thêm giường
            $table->string('status', 20)->default(RoomTypeStatus::ACTIVE->value);                  // Trạng thái (1: Hoạt động / Mở bán)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roomtypes');
    }
};
