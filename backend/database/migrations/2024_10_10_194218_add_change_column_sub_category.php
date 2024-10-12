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
        Schema::table('sub_categories', function (Blueprint $table) {
            $table->string("link")->nullable()->change();
            $table->string("slug")->unique()->nullable()->after("id");
        });

        Schema::table('categories', function (Blueprint $table) {
            $table->string("link")->nullable()->change();
            $table->string("slug")->unique()->nullable()->after("id");
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
