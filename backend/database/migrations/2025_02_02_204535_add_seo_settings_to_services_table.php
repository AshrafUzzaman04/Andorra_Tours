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
        Schema::table('services', function (Blueprint $table) {
            if (!Schema::hasColumn("services", "seo_title") && !Schema::hasColumn("services", "meta_description") && !Schema::hasColumn("services", "meta_tags")) {
                $table->string("seo_title")->nullable()->after("service_image");
                $table->longText("meta_description")->nullable()->after("seo_title");
                $table->string("meta_tags")->nullable()->after("meta_description");
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // Drop the 'meta_description' and 'meta_tags' columns
            $table->dropColumn(['meta_description', 'meta_tags']);
        });
    }
};
