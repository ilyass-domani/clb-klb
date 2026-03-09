<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\Rule;

final class LocaleController extends Controller
{
    private const SUPPORTED = ['fr', 'ar', 'nl'];

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'locale' => ['required', 'string', Rule::in(self::SUPPORTED)],
        ]);

        $locale = $validated['locale'];
        $request->session()->put('locale', $locale);
        Cookie::queue('locale', $locale, 60 * 24 * 365);

        return back();
    }
}
