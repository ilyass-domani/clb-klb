<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $events = Event::all();
        return inertia('user/events/index', [
            "events" => $events 
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/event/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.fr' => 'required|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'title.nl' => 'nullable|string|max:255',
            'description' => 'required|array',
            'description.fr' => 'required|string',
            'description.ar' => 'nullable|string',
            'description.nl' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required',
            'category' => 'required|array',
            'category.fr' => 'required|string|max:255',
            'category.ar' => 'nullable|string|max:255',
            'category.nl' => 'nullable|string|max:255',
            'price' => 'required|integer|min:0',
            'image' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        Event::create($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        return inertia('user/events/[id]', [
            "event" => $event
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return inertia('admin/event/edit', [
            'event' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|array',
            'title.fr' => 'required|string|max:255',
            'title.ar' => 'nullable|string|max:255',
            'title.nl' => 'nullable|string|max:255',
            'description' => 'required|array',
            'description.fr' => 'required|string',
            'description.ar' => 'nullable|string',
            'description.nl' => 'nullable|string',
            'date' => 'required|date',
            'time' => 'required',
            'category' => 'required|array',
            'category.fr' => 'required|string|max:255',
            'category.ar' => 'nullable|string|max:255',
            'category.nl' => 'nullable|string|max:255',
            'price' => 'required|integer|min:0',
            'image' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        $event->update($validated);

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully.');
    }

    /**
     * Admin listing of events.
     */
    public function adminIndex()
    {
        $events = Event::latest()->get();

        return inertia('admin/event/index', [
            'events' => $events,
        ]);
    }
}
