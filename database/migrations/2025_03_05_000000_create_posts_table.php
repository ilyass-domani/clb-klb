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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('category_slug', 64)->default('evenements');
            $table->string('image')->nullable();
            $table->json('title');       // { fr, ar, nl }
            $table->json('slug')->nullable(); // { fr, ar, nl } URL slug per locale
            $table->json('description'); // { fr, ar, nl }
            $table->json('body');        // { fr, ar, nl } HTML from Quill
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
