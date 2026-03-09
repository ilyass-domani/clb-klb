<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

final class ContactController extends Controller
{
    /**
     * Show the contact page.
     */
    public function index(): Response
    {
        $contact = ContactMessage::all();
        return Inertia::render('user/contact/index');
    }

    /**
     * Store a contact form submission in the database.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = Validator::validate($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:2000'],
        ], [
            'name.required' => 'Le nom complet est obligatoire.',
            'email.required' => 'L\'e-mail est obligatoire.',
            'email.email' => 'L\'e-mail doit être une adresse valide.',
            'subject.required' => 'Le sujet est obligatoire.',
        ]);

        ContactMessage::create($validated);

        return back()->with('success', 'Votre message a bien été envoyé. Notre équipe vous répondra rapidement.');
    }
}
