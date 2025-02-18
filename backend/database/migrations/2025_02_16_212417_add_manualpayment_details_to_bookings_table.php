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
            if (!Schema::hasColumn('bookings', 'manualpayment_email')) {
                $table->string("manualpayment_email")->nullable()->after("discounted_price");
            }

            if (!Schema::hasColumn('bookings', 'manualpayment_note')) {
                $table->text("manualpayment_note")->nullable()->after("manualpayment_email");
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['manualpayment_email', 'manualpayment_note']);
        });
    }
};