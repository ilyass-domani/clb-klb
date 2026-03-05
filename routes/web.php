<?php

use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/locale', [LocaleController::class, 'store'])->name('locale.store');

Route::get('/', function () {
    return Inertia::render('home/index');
})->name('home');

Route::get('/a-propos', function () {
    return Inertia::render('about/index');
})->name('about');




require __DIR__ . '/blog.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/events.php';
