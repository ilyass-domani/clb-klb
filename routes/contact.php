<?php

use App\Http\Controllers\User\ContactController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Inertia\Inertia;

Route::group(['prefix' => 'contact'], function () {
    Route::get('/', [ContactController::class, 'index'])->name('contact');
    Route::post('/', [ContactController::class, 'store'])->name('contact.store');
});
