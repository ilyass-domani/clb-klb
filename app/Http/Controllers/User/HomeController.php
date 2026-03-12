<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Partner;
use App\Models\TeamMember;
use App\Models\Event;
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
            ->where('is_published', true)
            ->orderByDesc('created_at')
            ->take(3)
            ->get()
            ->map(function (Blog $blog) use ($locale) {
                $imageUrl = $blog->image ? asset('storage/' . $blog->image) : null;
                return [
                    'id' => $blog->id,
                    'title' => $blog->getTranslation('title', $locale),
                    'excerpt' => $blog->getTranslation('description', $locale),
                    'image_url' => $imageUrl,
                    'published_at' => $blog->created_at?->translatedFormat('j F Y'),
                    'url' => '/blogs/' . $blog->id,
                ];
            })
            ->values()
            ->all();

        $recentEvents = Event::orderBy('date', 'desc')
            ->take(4)
            ->get()
            ->map(function (Event $event) {
                $image = $event->image;
                $imageUrl = $image
                    ? (str_starts_with($image, 'http') ? $image : asset('storage/' . $image))
                    : null;

                $dateObj = $event->date ? \Carbon\Carbon::parse($event->date) : null;
                $dateFormatted = $dateObj ? $dateObj->format('d M') : '';
                $timeStr = $event->time ? \Carbon\Carbon::parse($event->time)->format('H:i') : '';
                $timeRangeStr = $dateObj ? $dateObj->format('l, d F Y') . ($timeStr ? ' ' . $timeStr : '') : '';
                $timeRange = [
                    'fr' => $timeRangeStr,
                    'ar' => $timeRangeStr,
                    'nl' => $timeRangeStr,
                ];

                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'subtitle' => $event->category,
                    'description' => $event->description,
                    'date' => $dateFormatted,
                    'timeRange' => $timeRange,
                    'location' => $event->location ?? '',
                    'imageUrl' => $imageUrl,
                    'href' => route('events.show', $event),
                    'price' => $event->price,
                ];
            })
            ->values()
            ->all();

        $teamMembers = TeamMember::orderBy('sort_order')->orderBy('id')->get()
            ->map(fn (TeamMember $m) => [
                'id' => $m->id,
                'name' => $m->name,
                'category' => $m->category,
                'image_path' => $m->image_path,
                'imageUrl' => $m->image_url,
                'position' => $m->position,
                'description' => $m->description,
                'social_link' => $m->social_link,
            ])
            ->values()
            ->all();

        $partners = Partner::orderBy('sort_order')->orderBy('id')->get()
            ->map(fn (Partner $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'logoUrl' => $p->logo_url,
                'link' => $p->link,
            ])
            ->values()
            ->all();

        return Inertia::render('user/home/index', [
            'latestBlogs' => $latestBlogs,
            'recentEvents' => $recentEvents,
            'teamMembers' => $teamMembers,
            'partners' => $partners,
        ]);
    }
}
