<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'events'], function () {
    Route::get('/', [EventController::class, 'index'])->name('events.index');
    Route::get('/{event}', [EventController::class, 'show'])->name('events.show');
});
