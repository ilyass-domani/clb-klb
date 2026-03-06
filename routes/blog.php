<?php

use App\Http\Controllers\Admin\BlogController as AdminBlogController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;

Route::get('/blogs', [BlogController::class, 'index'])->name('user.blog');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('user.blog.show')->whereNumber('id');


Route::middleware(['auth', 'role:admin', 'verified'])->prefix('admin')->group(function () {
    Route::get('/blogs', [AdminBlogController::class, 'index'])->name('admin.blogs.index');
    Route::post('/blogs', [AdminBlogController::class, 'store'])->name('admin.blogs.store');
    Route::put('/blogs/{blog}', [AdminBlogController::class, 'update'])->name('admin.blogs.update');
    Route::delete('/blogs/{blog}', [AdminBlogController::class, 'destroy'])->name('admin.blogs.destroy');
});
