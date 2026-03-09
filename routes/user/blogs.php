<?php

use App\Http\Controllers\User\BlogController;
use Illuminate\Support\Facades\Route;

Route::get('/blogs', [BlogController::class, 'index'])->name('user.blog');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('user.blog.show')->whereNumber('id');
