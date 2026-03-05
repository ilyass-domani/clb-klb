<?php

use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/blogs', [BlogController::class, 'index'])->name('user.blog');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('user.blog.show')->whereNumber('id');

Route::group(['middleware' => 'auth', 'role:admin', 'verified'], function () {
    Route::get('/admin/blogs', function () {
        return Inertia::render('admin/blog/index');
    })->name('admin.blog');
});
