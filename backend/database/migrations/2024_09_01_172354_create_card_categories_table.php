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
        Schema::create('card_categories', function (Blueprint $table) {
            $table->id();
            $table->string("top_title")->unique();
            $table->string("top_sub_title");
            $table->string("tag");
            $table->string("image");
            $table->string("title")->unique();
            $table->longText("sub_title");
            $table->string("link")->default("#");
            $table->enum("status",["Active","Inactive"])->default("Active"); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('card_categories');
    }
};
