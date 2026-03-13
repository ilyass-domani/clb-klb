<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\ParticipantController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\BlogController;
use App\Http\Controllers\User\LocaleController;
use App\Models\Partner;
use App\Models\TeamMember;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::post('/locale', [LocaleController::class, 'store']);

Route::get('/', HomeController::class)->name('home');

Route::get('/a-propos', function () {
    $teamMembers = TeamMember::orderBy('sort_order')->orderBy('id')->get()
        ->map(fn ($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'category' => $m->category,
            'image_path' => $m->image_path,
            'imageUrl' => $m->image_url,
            'position' => $m->position,
            'description' => $m->description,
            'social_link' => $m->social_link,
        ]);
    $partners = Partner::orderBy('sort_order')->orderBy('id')->get()
        ->map(fn ($p) => ['id' => $p->id, 'name' => $p->name, 'logoUrl' => $p->logo_url, 'link' => $p->link]);
    return Inertia::render('user/about/index', [
        'teamMembers' => $teamMembers,
        'partners' => $partners,
    ]);
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

    Route::prefix('admin/team')->group(function () {
        Route::get('/', [TeamMemberController::class, 'index'])->name('admin.team.index');
        Route::get('/create', [TeamMemberController::class, 'create'])->name('admin.team.create');
        Route::post('/', [TeamMemberController::class, 'store'])->name('admin.team.store');
        Route::get('/{teamMember}/edit', [TeamMemberController::class, 'edit'])->name('admin.team.edit');
        Route::put('/{teamMember}', [TeamMemberController::class, 'update'])->name('admin.team.update');
        Route::delete('/{teamMember}', [TeamMemberController::class, 'destroy'])->name('admin.team.destroy');
    });

    Route::prefix('admin/partners')->group(function () {
        Route::get('/', [PartnerController::class, 'index'])->name('admin.partners.index');
        Route::get('/create', [PartnerController::class, 'create'])->name('admin.partners.create');
        Route::post('/', [PartnerController::class, 'store'])->name('admin.partners.store');
        Route::get('/{partner}/edit', [PartnerController::class, 'edit'])->name('admin.partners.edit');
        Route::put('/{partner}', [PartnerController::class, 'update'])->name('admin.partners.update');
        Route::delete('/{partner}', [PartnerController::class, 'destroy'])->name('admin.partners.destroy');
    });
});

Route::get('/blogs', [BlogController::class, 'index'])->name('user.blog');
Route::get('/blogs/{id}', [BlogController::class, 'show'])->name('user.blog.show')->whereNumber('id');

require __DIR__ . '/blog.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/contact.php';
require __DIR__ . '/events.php';
