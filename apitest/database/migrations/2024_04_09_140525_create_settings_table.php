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
        Schema::create('settings', function (Blueprint $table) {
            $table->string("company_name")->nullable();
            $table->string("company_email")->nullable();
            $table->string("company_phone")->nullable();
            $table->string("company_logo")->nullable();
            $table->string("company_city")->nullable();
            $table->string("company_country")->nullable();
            $table->string("company_address")->nullable();
            $table->string("company_postal_code")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
