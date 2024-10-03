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
        Schema::create('verano_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("verano_id");
            $table->foreign("verano_id")->references("id")->on("veranos")->onDelete("cascade");
            $table->enum("for",["verano","inverano"])->nullable();
            $table->json("details")->nullable();
            $table->json("pricing")->nullable();
            $table->string("form_title")->default("Booking Form")->nullable();
            $table->json("times")->nullable();
            $table->string("service_title")->nullable();
            $table->json("services")->nullable();
            $table->string("add_extra_title")->nullable();
            $table->json("add_extra")->nullable();
            $table->enum("status",["Active","Inactive"])->default("Active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verano_details');
    }
};
