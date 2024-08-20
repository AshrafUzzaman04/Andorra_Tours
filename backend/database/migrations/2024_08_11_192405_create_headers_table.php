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
        Schema::create('headers', function (Blueprint $table) {
            $table->id();
            $table->string("dark_logo");
            $table->string("light_logo");
            $table->boolean("show_language")->default(true);
            $table->boolean("show_currency")->default(true);
            $table->boolean("show_light_dark")->default(true);
            $table->boolean("show_signin_button")->default(true);
            $table->enum("status",["Active", "Inactive"]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('headers');
    }
};
