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
        Schema::create('files_folder', function (Blueprint $table) {
            // $table->id();
            $table->primary(['files_id', 'folder_id']);
            $table->unsignedBigInteger('files_id');
            $table->unsignedBigInteger('folder_id');
            $table->foreign('files_id')->references('id')->on('files')->onDelete('cascade');
            $table->foreign('folder_id')->references('id')->on('folders')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files_folder');
    }
};
