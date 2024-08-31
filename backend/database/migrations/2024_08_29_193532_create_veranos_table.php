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
        Schema::create('veranos', function (Blueprint $table) {
            $table->id();
            $table->string("label");
            $table->string("reviews");
            $table->string("total_reviews");
            $table->longText("reviews_link")->nullable();
            $table->string("title");
            $table->string("price");
            $table->string("booking_link");
            $table->string("photo");
            $table->enum("status",["Active", "Inactive"])->default("Active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('veranos');
    }
};
