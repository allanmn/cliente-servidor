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
        Schema::create('job_announcements', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ramo_id');
            $table->string('titulo');
            $table->text('description');
            $table->integer('experiencia');
            $table->decimal('min_salario', 10, 2);
            $table->decimal('max_salario', 10, 2);
            $table->boolean('ativo')->default(true);
            $table->unsignedBigInteger('empresa_id');
            $table->timestamps();

            $table->foreign('ramo_id')->references('id')->on('job_sectors')->onDelete('cascade');
            $table->foreign('empresa_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_announcements');
    }
};
