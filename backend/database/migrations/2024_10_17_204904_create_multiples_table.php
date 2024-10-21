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
        Schema::create('multiples', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("verano_id")->nullable();
            $table->foreign("verano_id")->references("id")->on("veranos")->onDelete("cascade")->onUpdate("cascade");
            $table->unsignedBigInteger("inverano_id")->nullable();
            $table->foreign("inverano_id")->references("id")->on("inveranos")->onDelete("cascade")->onUpdate("cascade");
            $table->enum("product_for",["verano","inverano","winter","summer"]);
            $table->string("title")->unique();
            $table->string("slug")->unique();
            $table->json("photos");
            $table->longText("description")->nullable();
            $table->json("pricing");
            $table->string("form_title")->nullable()->default("Booking Form");
            $table->string("service_title");
            $table->json("services");
            $table->string("extra_service_title")->nullable();
            $table->json("extra_services")->nullable();
            $table->enum("status", ["Active","Inactive"])->default("Active");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('multiples');
    }
};
