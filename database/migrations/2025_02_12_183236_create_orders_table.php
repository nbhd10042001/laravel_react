<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->string('phone', 45);
            $table->string('payment', 45);
            $table->string('order_id')->nullable();
            $table->foreignId('car_id')->constrained('cars');
            $table->integer('price');
            $table->integer('amount');
            $table->integer('total_price');
            $table->string('state', 125)->default('delivering');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
