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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->default(0);
            $table->string('review_title');
            $table->longText('review_text');
            $table->string('client_photo');
            $table->string('client_name');
            $table->string('client_address');
            $table->enum('reviews',[1,2,3,4,5])->default(5);
            $table->enum('status',["Active","Inactive"])->default("Active"); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
