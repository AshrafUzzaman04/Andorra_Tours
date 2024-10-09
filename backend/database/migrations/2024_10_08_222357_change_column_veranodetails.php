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
        Schema::table('verano_details', function (Blueprint $table) {
            $table->unsignedBigInteger("verano_id")->nullable()->change();
            $table->unsignedBigInteger("inverano_id")->nullable();
            $table->foreign("inverano_id")->references("id")->on("inveranos")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
