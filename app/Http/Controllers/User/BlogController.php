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
            'description' => $blog->getTranslation('description', $locale),
            'body' => $blog->getTranslation('body', $locale),
            'category' => $blog->getTranslation('category', $locale),
            'author' => (string) ($blog->author ?? ''),
            'image_url' => $imageUrl,
            'published_at' => $blog->created_at?->translatedFormat('j F Y'),
            'url' => '/blogs/' . $blog->id,
        ];
    }

    /**
     * Public: published blogs listing with current locale translation (fallback fr).
     */
    public function index(Request $request): Response
    {
        $locale = $this->locale();
        $perPage = 6;
        $selectedCategory = trim((string) $request->query('category', 'all'));

        $categories = Blog::query()
            ->where('is_published', true)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Blog $blog) => $blog->getTranslation('category', $locale))
            ->filter(fn (string $category) => $category !== '')
            ->unique()
            ->values()
            ->all();

        if ($selectedCategory !== 'all' && ! in_array($selectedCategory, $categories, true)) {
            $selectedCategory = 'all';
        }

        $paginated = Blog::query()
            ->where('is_published', true)
            ->when($selectedCategory !== 'all', function ($query) use ($selectedCategory, $locale) {
                $query->where("category->{$locale}", $selectedCategory);
            })
            ->orderByDesc('created_at')
            ->paginate($perPage)
            ->withQueryString();

        $blogs = $paginated->getCollection()->map(fn (Blog $blog) => $this->blogToArray($blog))->values()->all();

        $lastPage = $paginated->lastPage();
        $currentPage = $paginated->currentPage();
        $links = [];
        for ($i = 1; $i <= $lastPage; $i++) {
            $links[] = [
                'url' => $paginated->url($i),
                'label' => (string) $i,
                'active' => $i === $currentPage,
            ];
        }

        return Inertia::render('user/blog/index', [
            'blogs' => $blogs,
            'categories' => $categories,
            'activeCategory' => $selectedCategory,
            'pagination' => [
                'current_page' => $currentPage,
                'last_page' => $lastPage,
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'links' => $links,
                'prev_url' => $paginated->previousPageUrl(),
                'next_url' => $paginated->nextPageUrl(),
            ],
        ]);
    }

    /**
     * Public: single published blog with current locale translation (fallback fr).
     */
    public function show(int $id): Response
    {
        $blog = Blog::query()
            ->where('is_published', true)
            ->find($id);

        if (! $blog) {
            abort(404);
        }

        return Inertia::render('user/blog/[id]', [
            'blog' => $this->blogToArray($blog),
        ]);
    }
}
