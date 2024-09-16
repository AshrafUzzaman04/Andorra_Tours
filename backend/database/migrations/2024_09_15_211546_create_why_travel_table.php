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
        Schema::create('why_travel', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->string('background_color')->default("#E4F9F9");
            $table->string('description');
            $table->string('logo');
            $table->enum("status",["Active", "Inactive"])->default("Active");
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('why_travel');
    }
};
