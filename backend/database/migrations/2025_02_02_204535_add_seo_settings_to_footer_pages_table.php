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
        Schema::table('footer_pages', function (Blueprint $table) {
            if (!Schema::hasColumn("footer_pages", "meta_description") && !Schema::hasColumn("footer_pages", "meta_tags")) {
                $table->longText("meta_description")->nullable()->after("content");
                $table->string("meta_tags")->nullable()->after("meta_description");
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('footer_pages', function (Blueprint $table) {
            $table->dropColumn(['meta_description', 'meta_tags']);
        });
    }
};
