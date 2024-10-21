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
        Schema::table('footer_pages', function (Blueprint $table) {
            $table->string("title_for")->nullable()->after("page_title");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('footer_pages', function (Blueprint $table) {
            $table->dropColumn("title_for");
        });
    }
};
