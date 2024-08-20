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
        Schema::create('heroes', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("title_color");
            $table->string("button_text");
            $table->string("button_text_color");
            $table->string("button_color");
            $table->string("button_link");
            $table->string("slider_image");
            $table->string("thumnail_image");
            $table->longText("description");
            $table->string("description_text_color");
            $table->enum("status",['Active', 'Inactive']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('heroes');
    }
};
