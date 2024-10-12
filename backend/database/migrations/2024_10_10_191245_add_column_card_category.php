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
        Schema::table('card_categories', function (Blueprint $table) {
            $table->string("slug")->unique()->nullable()->after("title");
            $table->string("tag_title")->nullable()->after("top_sub_title");
            $table->string("tag_slug")->nullable()->after("tag_title");
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
