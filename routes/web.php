<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ParticipantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/locale', [LocaleController::class, 'store']);

Route::get('/', function () {
    return Inertia::render('user/home/index');
})->name('home');

Route::get('/a-propos', function () {
    return Inertia::render('user/about/index');
})->name('about');

// Admin routes (use app-sidebar layout via AppLayout)
Route::group(['middleware' => ['auth', 'role:admin', 'verified']], function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin/events')->group(function () {
        Route::get('/', [EventController::class, 'adminIndex'])->name('admin.events.index');
        Route::get('/create', [EventController::class, 'create'])->name('admin.events.create');
        Route::post('/', [EventController::class, 'store'])->name('admin.events.store');
        Route::get('/{event}/edit', [EventController::class, 'edit'])->name('admin.events.edit');
        Route::put('/{event}', [EventController::class, 'update'])->name('admin.events.update');
        Route::delete('/{event}', [EventController::class, 'destroy'])->name('admin.events.destroy');
    });

    Route::prefix('admin/participants')->group(function () {
        Route::get('/', [ParticipantController::class, 'adminIndex'])->name('admin.participants.index');
        Route::delete('/{participant}', [ParticipantController::class, 'destroy'])->name('admin.participants.destroy');
    });
});




require __DIR__ . '/blog.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/events.php';
