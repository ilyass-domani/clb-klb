<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
        'title',
        'description',
        'date',
        'time',
        'category',
        'price',
        'image',
        'location',
    ];

    protected $casts = [
        'title' => 'array',
        'description' => 'array',
        'category' => 'array',
    ];

    public function participants()
    {
        return $this->hasMany(Participant::class);
    }
}
