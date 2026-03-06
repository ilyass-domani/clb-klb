<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    private const CATEGORIES = [
        ['slug' => 'tout', 'label' => 'Tout'],
        ['slug' => 'evenements', 'label' => 'Événements'],
        ['slug' => 'cooperation', 'label' => 'Coopération'],
        ['slug' => 'portraits', 'label' => 'Portraits'],
        ['slug' => 'culture', 'label' => 'Culture'],
    ];

    private const CATEGORIES_ADMIN = [
        ['slug' => 'evenements', 'label_fr' => 'Événements', 'label_ar' => 'فعاليات', 'label_nl' => 'Evenementen'],
        ['slug' => 'cooperation', 'label_fr' => 'Coopération', 'label_ar' => 'تعاون', 'label_nl' => 'Samenwerking'],
        ['slug' => 'portraits', 'label_fr' => 'Portraits', 'label_ar' => 'صور', 'label_nl' => 'Portretten'],
        ['slug' => 'culture', 'label_fr' => 'Culture', 'label_ar' => 'ثقافة', 'label_nl' => 'Cultuur'],
    ];

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
            'category' => $this->categoryLabel($blog->category_slug),
            'category_slug' => $blog->category_slug,
            'image_url' => $imageUrl,
            'published_at' => $blog->published_at?->translatedFormat('j F Y'),
            'url' => '/blogs/' . $blog->id,
        ];
    }

    private function categoryLabel(string $slug): string
    {
        foreach (self::CATEGORIES as $c) {
            if ($c['slug'] === $slug) {
                return $c['label'];
            }
        }
        return $slug;
    }

    /**
     * Public: blog listing.
     */
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('category', 'tout');
        $perPage = 6;

        $query = Blog::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());

        if ($categorySlug !== 'tout') {
            $query->where('category_slug', $categorySlug);
        }

        $paginated = $query->orderByDesc('published_at')->paginate($perPage);

        $blogs = $paginated->getCollection()->map(fn (Blog $blog) => $this->blogToArray($blog))->values()->all();

        $lastPage = $paginated->lastPage();
        $currentPage = $paginated->currentPage();
        $basePath = $request->url();
        $queryParams = $request->query();
        $links = [];
        for ($i = 1; $i <= $lastPage; $i++) {
            $queryParams['page'] = $i;
            $links[] = [
                'url' => $basePath . '?' . http_build_query($queryParams),
                'label' => (string) $i,
                'active' => $i === $currentPage,
            ];
        }

        $nextUrl = $currentPage < $lastPage
            ? $basePath . '?' . http_build_query(array_merge($request->query(), ['page' => $currentPage + 1]))
            : null;

        return Inertia::render('user/blog/index', [
            'blogs' => $blogs,
            'categories' => self::CATEGORIES,
            'currentCategory' => $categorySlug,
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
     * Public: single blog.
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

    /**
     * Admin: list blogs.
     */
    public function adminIndex(): Response
    {
        $blogs = Blog::query()
            ->orderByDesc('created_at')
            ->get()
            ->map(fn (Blog $blog) => [
                'id' => $blog->id,
                'category_slug' => $blog->category_slug,
                'image' => $blog->image ? asset('storage/' . $blog->image) : null,
                'title_fr' => $blog->getTranslation('title', 'fr'),
                'published_at' => $blog->published_at?->toIso8601String(),
                'created_at' => $blog->created_at->toIso8601String(),
            ]);

        return Inertia::render('admin/blog/index', [
            'blogs' => $blogs,
            'categories' => self::CATEGORIES_ADMIN,
        ]);
    }

    /**
     * Admin: create form.
     */
    public function create(): Response
    {
        return Inertia::render('admin/blog/create', [
            'categories' => self::CATEGORIES_ADMIN,
        ]);
    }

    /**
     * Admin: store blog.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'category_slug' => ['required', 'string', 'in:evenements,cooperation,portraits,culture'],
            'image' => ['nullable', 'image', 'max:2048'],
            'title.fr' => ['required', 'string', 'max:255'],
            'title.ar' => ['nullable', 'string', 'max:255'],
            'title.nl' => ['nullable', 'string', 'max:255'],
            'description.fr' => ['nullable', 'string', 'max:2000'],
            'description.ar' => ['nullable', 'string', 'max:2000'],
            'description.nl' => ['nullable', 'string', 'max:2000'],
            'body.fr' => ['nullable', 'string'],
            'body.ar' => ['nullable', 'string'],
            'body.nl' => ['nullable', 'string'],
            'published_at' => ['nullable', 'string', 'date'],
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $blog = new Blog;
        $blog->category_slug = $validated['category_slug'];
        $blog->image = $imagePath;
        $blog->title = [
            'fr' => $validated['title']['fr'] ?? '',
            'ar' => $validated['title']['ar'] ?? '',
            'nl' => $validated['title']['nl'] ?? '',
        ];
        $blog->description = [
            'fr' => $validated['description']['fr'] ?? '',
            'ar' => $validated['description']['ar'] ?? '',
            'nl' => $validated['description']['nl'] ?? '',
        ];
        $blog->body = [
            'fr' => $validated['body']['fr'] ?? '',
            'ar' => $validated['body']['ar'] ?? '',
            'nl' => $validated['body']['nl'] ?? '',
        ];
        $blog->published_at = ! empty($validated['published_at']) ? $validated['published_at'] : null;
        $blog->save();

        return redirect()->route('admin.blog.index')->with('success', 'Article créé.');
    }

    /**
     * Admin: edit form.
     */
    public function edit(Blog $blog): Response
    {
        return Inertia::render('admin/blog/[id]', [
            'blog' => [
                'id' => $blog->id,
                'category_slug' => $blog->category_slug,
                'image' => $blog->image ? asset('storage/' . $blog->image) : null,
                'image_path' => $blog->image,
                'title' => $blog->title,
                'description' => $blog->description,
                'body' => $blog->body,
                'published_at' => $blog->published_at?->format('Y-m-d'),
            ],
            'categories' => self::CATEGORIES_ADMIN,
        ]);
    }

    /**
     * Admin: update blog.
     */
    public function update(Request $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validate([
            'category_slug' => ['required', 'string', 'in:evenements,cooperation,portraits,culture'],
            'image' => ['nullable', 'image', 'max:2048'],
            'title.fr' => ['required', 'string', 'max:255'],
            'title.ar' => ['nullable', 'string', 'max:255'],
            'title.nl' => ['nullable', 'string', 'max:255'],
            'description.fr' => ['nullable', 'string', 'max:2000'],
            'description.ar' => ['nullable', 'string', 'max:2000'],
            'description.nl' => ['nullable', 'string', 'max:2000'],
            'body.fr' => ['nullable', 'string'],
            'body.ar' => ['nullable', 'string'],
            'body.nl' => ['nullable', 'string'],
            'published_at' => ['nullable', 'string', 'date'],
        ]);

        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $blog->image = $request->file('image')->store('blogs', 'public');
        }

        $blog->category_slug = $validated['category_slug'];
        $blog->title = [
            'fr' => $validated['title']['fr'] ?? '',
            'ar' => $validated['title']['ar'] ?? '',
            'nl' => $validated['title']['nl'] ?? '',
        ];
        $blog->description = [
            'fr' => $validated['description']['fr'] ?? '',
            'ar' => $validated['description']['ar'] ?? '',
            'nl' => $validated['description']['nl'] ?? '',
        ];
        $blog->body = [
            'fr' => $validated['body']['fr'] ?? '',
            'ar' => $validated['body']['ar'] ?? '',
            'nl' => $validated['body']['nl'] ?? '',
        ];
        $blog->published_at = ! empty($validated['published_at']) ? $validated['published_at'] : null;
        $blog->save();

        return redirect()->route('admin.blog.index')->with('success', 'Article mis à jour.');
    }

    /**
     * Admin: delete blog.
     */
    public function destroy(Blog $blog): RedirectResponse
    {
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }
        $blog->delete();
        return redirect()->route('admin.blog.index')->with('success', 'Article supprimé.');
    }
}
