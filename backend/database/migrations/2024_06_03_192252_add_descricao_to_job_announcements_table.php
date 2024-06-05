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
        Schema::table('job_announcements', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->text('descricao');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('job_announcements', function (Blueprint $table) {
            $table->dropColumn('descricao');
            $table->text('description');
        });
    }
};
