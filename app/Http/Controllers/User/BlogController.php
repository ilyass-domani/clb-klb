<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    private function locale(): string
    {
        $locale = app()->getLocale();
        return in_array($locale, ['fr', 'ar', 'nl'], true) ? $locale : 'fr';
    }

    private function blogToArray(Blog $blog): array
    {
        $locale = $this->locale();
        $imageUrl = $blog->image ? asset('storage/' . $blog->image) : null;

        return [
            'id' => $blog->id,
            'title' => $blog->getTranslation('title', $locale),
            'excerpt' => $blog->getTranslation('description', $locale),
            'body' => $blog->getTranslation('body', $locale),
            'image_url' => $imageUrl,
            'published_at' => $blog->published_at?->translatedFormat('j F Y'),
            'url' => '/blogs/' . $blog->id,
        ];
    }

    /**
     * Public: published blogs listing with current locale translation (fallback fr).
     */
    public function index(Request $request): Response
    {
        $perPage = 6;

        $paginated = Blog::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->paginate($perPage);

        $blogs = $paginated->getCollection()->map(fn (Blog $blog) => $this->blogToArray($blog))->values()->all();

        $lastPage = $paginated->lastPage();
        $currentPage = $paginated->currentPage();
        $basePath = $request->url();
        $links = [];
        for ($i = 1; $i <= $lastPage; $i++) {
            $links[] = [
                'url' => $basePath . ($i === 1 ? '' : '?page=' . $i),
                'label' => (string) $i,
                'active' => $i === $currentPage,
            ];
        }

        $nextUrl = $currentPage < $lastPage
            ? $basePath . '?page=' . ($currentPage + 1)
            : null;

        return Inertia::render('user/blog/index', [
            'blogs' => $blogs,
            'pagination' => [
                'current_page' => $currentPage,
                'last_page' => $lastPage,
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'links' => $links,
                'next_url' => $nextUrl,
            ],
        ]);
    }

    /**
     * Public: single published blog with current locale translation (fallback fr).
     */
    public function show(int $id): Response
    {
        $blog = Blog::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now())
            ->find($id);

        if (! $blog) {
            abort(404);
        }

        return Inertia::render('user/blog/[id]', [
            'blog' => $this->blogToArray($blog),
        ]);
    }
}
