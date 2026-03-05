<?php

use App\Http\Controllers\Dashboard\BlogController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'role:admin', 'verified'])->prefix('admin')->group(function () {
    Route::get('/blogs', [BlogController::class, 'index'])->name('dashboard.blogs.index');
    Route::post('/blogs', [BlogController::class, 'store'])->name('dashboard.blogs.store');
    Route::put('/blogs/{blog}', [BlogController::class, 'update'])->name('dashboard.blogs.update');
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->name('dashboard.blogs.destroy');
});
