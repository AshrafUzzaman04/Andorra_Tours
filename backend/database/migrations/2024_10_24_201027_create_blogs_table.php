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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id")->default(0);
            $table->string("tag");
            $table->string("photo");
            $table->json("images")->nullable();
            $table->date("date");
            $table->string("title")->unique();
            $table->string("slug")->unique();
            $table->string("user_photo");
            $table->string("user_name");
            $table->string("button_text")->nullable();
            $table->longText("description")->nullable();
            // $table->string("video_thumbnail")->nullable();
            // $table->string("videos")->nullable();
            // $table->string("video_link")->nullable();
            $table->enum("status",["Active","Inactive"])->default("Active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
