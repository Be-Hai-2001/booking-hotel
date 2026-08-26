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
        // Schema::create('hotels', function (Blueprint $table) {
        //     $table->id();
        //     $table->timestamps();
        // });

        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('xa_phuong_id')->nullable();
            $table->string('tenKS');
            $table->text('diaChiChiTiet')->nullable();
            $table->text('diaChiSnapshot')->nullable();
            $table->string('sdt')->nullable();
            $table->decimal('ratingTB', 2, 1)->default(0);
            $table->boolean('is_floating_hotel')->default(false);
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
