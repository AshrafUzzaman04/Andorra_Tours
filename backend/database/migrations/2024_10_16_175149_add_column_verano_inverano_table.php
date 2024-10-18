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
        Schema::table("inveranos", function (Blueprint $table) {
            $table->string("type")->nullable()->after("total_reviews");
        });
        Schema::table("veranos", function (Blueprint $table) {
            $table->string("type")->nullable()->after("total_reviews");
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
