<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'title.ar' => ['required', 'string', 'max:255'],
            'title.fr' => ['required', 'string', 'max:255'],
            'title.nl' => ['required', 'string', 'max:255'],
            'slug.ar' => ['required', 'string', 'max:255'],
            'slug.fr' => ['required', 'string', 'max:255'],
            'slug.nl' => ['required', 'string', 'max:255'],
            'body.ar' => ['required', 'string'],
            'body.fr' => ['required', 'string'],
            'body.nl' => ['required', 'string'],
        ];
    }
}
