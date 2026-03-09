<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    /**
     * List blogs for admin table (full locale data for edit modal).
     */
    public function index(Request $request): Response
    {
        $locale = $request->query('locale', app()->getLocale());
        if (! in_array($locale, ['ar', 'fr', 'nl'], true)) {
            $locale = 'fr';
        }

        $blogs = Blog::query()
            ->orderByDesc('created_at')
            ->get()
            ->map(function (Blog $blog) use ($locale) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title ?? [],
                    'slug' => $blog->slug ?? [],
                    'body' => $blog->body ?? [],
                    'image' => $blog->image ? asset('storage/' . $blog->image) : null,
                    'status' => $blog->published_at ? 'published' : 'draft',
                    'published_at' => $blog->published_at?->toIso8601String(),
                    'created_at' => $blog->created_at->toIso8601String(),
                    'title_active' => $blog->getTranslation('title', $locale),
                ];
            })
            ->values()
            ->all();

        return Inertia::render('admin/blog/index', [
            'blogs' => $blogs,
            'activeLocale' => $locale,
        ]);
    }

    /**
     * Store a new blog.
     */
    public function store(StoreBlogRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        Blog::query()->create([
            'image' => $imagePath,
            'title' => [
                'ar' => $validated['title']['ar'] ?? '',
                'fr' => $validated['title']['fr'] ?? '',
                'nl' => $validated['title']['nl'] ?? '',
            ],
            'slug' => [
                'ar' => $validated['slug']['ar'] ?? '',
                'fr' => $validated['slug']['fr'] ?? '',
                'nl' => $validated['slug']['nl'] ?? '',
            ],
            'body' => [
                'ar' => $validated['body']['ar'] ?? '',
                'fr' => $validated['body']['fr'] ?? '',
                'nl' => $validated['body']['nl'] ?? '',
            ],
            'description' => ['ar' => '', 'fr' => '', 'nl' => ''],
            'published_at' => now(),
        ]);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog created.');
    }

    /**
     * Update an existing blog.
     */
    public function update(UpdateBlogRequest $request, Blog $blog): RedirectResponse
    {
        $validated = $request->validated();

        $imagePath = $blog->image;
        if ($request->hasFile('image')) {
            if ($blog->image) {
                Storage::disk('public')->delete($blog->image);
            }
            $imagePath = $request->file('image')->store('blogs', 'public');
        }

        $blog->update([
            'image' => $imagePath,
            'title' => [
                'ar' => $validated['title']['ar'] ?? '',
                'fr' => $validated['title']['fr'] ?? '',
                'nl' => $validated['title']['nl'] ?? '',
            ],
            'slug' => [
                'ar' => $validated['slug']['ar'] ?? '',
                'fr' => $validated['slug']['fr'] ?? '',
                'nl' => $validated['slug']['nl'] ?? '',
            ],
            'body' => [
                'ar' => $validated['body']['ar'] ?? '',
                'fr' => $validated['body']['fr'] ?? '',
                'nl' => $validated['body']['nl'] ?? '',
            ],
        ]);

        return redirect()->route('admin.blogs.index')->with('success', 'Blog updated.');
    }

    /**
     * Delete a blog.
     */
    public function destroy(Blog $blog): RedirectResponse
    {
        if ($blog->image) {
            Storage::disk('public')->delete($blog->image);
        }
        $blog->delete();
        return redirect()->route('admin.blogs.index')->with('success', 'Blog deleted.');
    }
}
