<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    private function locale(): string
    {
        $locale = app()->getLocale();
        return in_array($locale, ['fr', 'ar', 'nl'], true) ? $locale : 'fr';
    }

    /**
     * Home page with latest blog posts for the "Derniers articles" section.
     */
    public function __invoke(Request $request): Response
    {
        $locale = $this->locale();

        $latestBlogs = Blog::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->take(3)
            ->get()
            ->map(function (Blog $blog) use ($locale) {
                $imageUrl = $blog->image ? asset('storage/' . $blog->image) : null;
                return [
                    'id' => $blog->id,
                    'title' => $blog->getTranslation('title', $locale),
                    'excerpt' => $blog->getTranslation('description', $locale),
                    'image_url' => $imageUrl,
                    'published_at' => $blog->published_at?->translatedFormat('j F Y'),
                    'url' => '/blogs/' . $blog->id,
                ];
            })
            ->values()
            ->all();

        return Inertia::render('user/home/index', [
            'latestBlogs' => $latestBlogs,
        ]);
    }
}
