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
        Schema::create('hotels', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('categorie_id');
            $table->foreign("categorie_id")->references("id")->on("card_categories")->onDelete("cascade");
            $table->string("photo");
            $table->string("photo_one")->nullable();
            $table->string("photo_two")->nullable();
            $table->string("photo_three")->nullable();
            $table->string("review");
            $table->string("total_review");
            $table->string("title")->unique();
            $table->string("slug")->unique()->nullable();
            $table->string("location");
            $table->string("map_location");
            $table->string("tag");
            $table->string("hotel_link")->nullable();
            $table->longText("description");
            $table->enum("status",["Active","Inactive"])->default("Active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hotels');
    }
};
