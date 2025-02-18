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
        Schema::table('veranos', function (Blueprint $table) {
            if (!Schema::hasColumn("veranos", "meta_description") && !Schema::hasColumn("veranos", "meta_tags") && !Schema::hasColumn("veranos", "meta_title")) {
                $table->longText("meta_title")->nullable()->after("photo");
                $table->longText("meta_description")->nullable()->after("meta_title");
                $table->string("meta_tags")->nullable()->after("meta_description");
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('veranos', function (Blueprint $table) {
            $table->dropColumn(["meta_title", "meta_description", "meta_tags"]);
        });
    }
};