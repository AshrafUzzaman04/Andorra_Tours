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
        Schema::create('resorts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("provider_id");
            $table->foreign('provider_id')->references('id')->on('providers')->onDelete('cascade');
            $table->string('photo');
            $table->string('name');
            $table->string('country');
            $table->string('height');
            $table->string('alpine_skiing')->nullable();
            $table->string('ski_lifts')->nullable();
            $table->string('clues')->nullable();
            $table->string('details_title')->nullable();
            $table->string('description')->nullable();
            $table->enum('status', ['Active','Inactive'])->default('Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resorts');
    }
};
