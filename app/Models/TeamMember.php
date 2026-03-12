<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = [
        'name',
        'category',
        'image_path',
        'position',
        'description',
        'sort_order',
        'social_link',
    ];

    protected $appends = ['image_url'];

    /**
     * Storage-relative path (no leading /storage/).
     */
    public function getImagePathStorageAttribute(): ?string
    {
        $path = $this->attributes['image_path'] ?? null;
        if (!$path) {
            return null;
        }
        if (str_starts_with($path, 'storage/')) {
            return substr($path, 8);
        }
        if (str_starts_with($path, '/storage/')) {
            return substr($path, 9);
        }
        return $path;
    }

    /**
     * Full URL for the image (Storage or legacy public path).
     */
    public function getImageUrlAttribute(): ?string
    {
        $path = $this->attributes['image_path'] ?? null;
        if (!$path) {
            return null;
        }
        if (str_starts_with($path, 'http')) {
            return $path;
        }
        if (str_starts_with($path, '/storage/')) {
            return asset(ltrim($path, '/'));
        }
        if (str_starts_with($path, '/')) {
            return asset($path);
        }
        return asset('storage/' . $path);
    }
}
