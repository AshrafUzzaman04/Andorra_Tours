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
        Schema::create('company_promotions', function (Blueprint $table) {
            $table->id();
            $table->string('content_for')->unique();
            $table->string('title')->unique();
            $table->longText('sub_title')->nullable();
            $table->json('pricing_cards')->nullable();
            $table->longText('description')->nullable();
            $table->json('company_benifits')->nullable();
            $table->string('image')->nullable();
            $table->enum('status', ['Active', 'Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_promotions');
    }
};
