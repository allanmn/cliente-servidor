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
        Schema::create('job_announcement_skill', function (Blueprint $table) {
            $table->unsignedBigInteger('job_announcement_id');
            $table->unsignedBigInteger('skill_id');

            $table->foreign('job_announcement_id')->references('id')->on('job_announcements')->onDelete('cascade');
            $table->foreign('skill_id')->references('id')->on('skills')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_announcement_skill');
    }
};
