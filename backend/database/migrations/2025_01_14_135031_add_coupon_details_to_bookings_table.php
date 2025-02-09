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
        Schema::table('bookings', function (Blueprint $table) {
            if (!Schema::hasColumn('bookings', 'coupon_id')) {
                $table->unsignedBigInteger("coupon_id")->nullable()->after("order_note");
                $table->foreign("coupon_id")->references("id")->on("cupon_codes")->onDelete("set null")->onUpdate("cascade");
            }
            $table->decimal("discounted_price", "10", "2")->nullable()->after("coupon_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['coupon_id']); // Drop the foreign key constraint
            $table->dropColumn('coupon_id');    // Drop the column
        });
    }
};