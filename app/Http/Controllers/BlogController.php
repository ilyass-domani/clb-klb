<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
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

    /**
     * Mock blog posts for the listing page. Replace with Post::query() when a Post model exists.
     *
     * @return array<int, array{id: int, title: string, excerpt: string, category: string, category_slug: string, image_url: string, published_at: string, author: string, url: string}>
     */
    private static function mockPosts(): array
    {
        $categories = [
            ['label' => 'Événements', 'slug' => 'evenements'],
            ['label' => 'Culture', 'slug' => 'culture'],
            ['label' => 'Coopération', 'slug' => 'cooperation'],
            ['label' => 'Portraits', 'slug' => 'portraits'],
        ];

        $titles = [
            "Flor-Débat Avec Dr Younes Sekkouri: Leadership Féminin, Réalités Et Défis.",
            "Rencontre annuelle du Cercle des Lauréats 2026.",
            "Partenariat CLB-KLB et l'Ambassade de Belgique au Maroc.",
            "Portrait: Mahdi Rouzane, de l'enseignement belge à l'excellence.",
            "Culture et éducation: les ponts entre la Belgique et le Maroc.",
            "Événement spécial: soirée des lauréats à Rabat.",
            "Coopération universitaire: perspectives 2026.",
            "Portrait: Une lauréate au service de l'innovation.",
        ];

        $posts = [];
        foreach (array_values($titles) as $i => $title) {
            $cat = $categories[$i % count($categories)];
            $posts[] = [
                'id' => $i + 1,
                'title' => $title,
                'excerpt' => "Ici, nous explorons les réussites exceptionnelles qui font la fierté de notre nation. Que vous soyez membre du CLB, aspirant lauréat ou simplement curieux, ce blog est votre passeport pour découvrir les histoires inspirantes.",
                'category' => $cat['label'],
                'category_slug' => $cat['slug'],
                'image_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
                'published_at' => '6 MARS 2026',
                'author' => 'MAHDI ROUZANE',
                'url' => '/blogs/' . ($i + 1),
            ];
        }

        return $posts;
    }

    /**
     * Display the blog listing with optional category filter and pagination.
     */
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('category', 'tout');
        $perPage = 9;
        $all = collect(self::mockPosts());

        $filtered = $categorySlug === 'tout'
            ? $all
            : $all->where('category_slug', $categorySlug)->values();

        $page = LengthAwarePaginator::resolveCurrentPage();
        $paginated = new LengthAwarePaginator(
            $filtered->forPage($page, $perPage)->values(),
            $filtered->count(),
            $perPage,
            $page,
            ['path' => $request->url(), 'query' => $request->query()]
        );

        $lastPage = $paginated->lastPage();
        $currentPage = $paginated->currentPage();
        $basePath = $request->url();
        $query = $request->query();
        $links = [];
        for ($i = 1; $i <= $lastPage; $i++) {
            $query['page'] = $i;
            $links[] = [
                'url' => $basePath . '?' . http_build_query($query),
                'label' => (string) $i,
                'active' => $i === $currentPage,
            ];
        }

        $nextUrl = $currentPage < $lastPage
            ? $basePath . '?' . http_build_query(array_merge($query, ['page' => $currentPage + 1]))
            : null;

        return Inertia::render('user/blog/index', [
            'posts' => $paginated->items(),
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
     * Display a single blog post. Uses mock data until a Post model exists.
     */
    public function show(int $id): Response
    {
        $all = self::mockPosts();
        $post = collect($all)->firstWhere('id', $id);

        if (!$post) {
            abort(404);
        }

        return Inertia::render('user/blog/[id]', [
            'post' => $post,
        ]);
    }
}
