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
        Schema::create('footer_pages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('category');
            $table->foreign('category')->references('id')->on('page_categories')->onDelete("cascade");
            $table->string("page_name")->unique();
            $table->string("page_slug")->unique();
            $table->string("page_title")->unique()->nullable();
            $table->longText("content")->nullable();
            $table->enum("status",["Active","Inactive"])->default("Active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footer_pages');
    }
};
