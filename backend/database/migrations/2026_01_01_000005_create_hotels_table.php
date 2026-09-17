<?php

use App\Modules\Hotel\Domain\Enums\HotelStatus;
use App\Modules\User\Domain\Enums\UserRole;
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
        // Migration chuẩn cho Database
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();

            // Ward thuộc Module Location -> Không nên Cascade Delete!
            $table->foreignId('ward_id')->constrained('wards')->restrictOnDelete();

            $table->text('hotel_name');
            // Do admin khách sạn nhập: Mục đích để hiển thị thêm chú thích nếu cần
            $table->text('diaChiChiTiet')->nullable();
            // Tự lưu vào db để sau này có đổi địa chỉ quốc gia còn truy xuất được địa chỉ cũ trong hóa đơn ...
            $table->text('diaChiSnapshot');
            $table->string('sdt')->nullable();
            // Xếp hạng đánh giá khách sạn
            $table->decimal('ratingTB', 2, 1)->default(0);
            // Khác sạn nổi bậc hay không (do system admin edit => hiển thị lên view khách sạn nổi bậc)
            $table->tinyInteger('is_floating_hotel')->default(0);
            $table->string('status', 20)->default(HotelStatus::ACTIVE->value);
            $table->string('role', 20)->default(UserRole::PARTNER->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
