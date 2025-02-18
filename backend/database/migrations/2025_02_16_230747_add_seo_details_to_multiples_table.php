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
        Schema::table('multiples', function (Blueprint $table) {
            if (!Schema::hasColumn("multiples", "meta_description") && !Schema::hasColumn("multiples", "meta_tags") && !Schema::hasColumn("multiples", "meta_title")) {
                $table->longText("meta_title")->nullable()->after("extra_services");
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
        Schema::table('multiples', function (Blueprint $table) {
            $table->dropColumn(["meta_title", "meta_description", "meta_tags"]);
        });
    }
};