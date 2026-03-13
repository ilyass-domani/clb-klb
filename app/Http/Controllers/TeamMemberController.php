<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    public function index()
    {
        $teamMembers = TeamMember::orderBy('sort_order')->orderBy('id')->get();

        return Inertia::render('admin/team/index', [
            'teamMembers' => $teamMembers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/team/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:bureau,honorary',
            'image' => 'required|image|max:2048',
            'position' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'social_link' => 'nullable|string|max:255',
        ]);

        $path = $request->file('image')->store('images/team', 'public');
        $validated['image_path'] = $path;
        $validated['sort_order'] = (int) ($validated['sort_order'] ?? TeamMember::max('sort_order') + 1);
        unset($validated['image']);

        TeamMember::create($validated);

        return redirect()->route('admin.team.index')->with('success', 'Team member added successfully.');
    }

    public function edit(TeamMember $teamMember)
    {
        return Inertia::render('admin/team/edit', [
            'teamMember' => $teamMember,
        ]);
    }

    public function update(Request $request, TeamMember $teamMember)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:bureau,honorary',
            'image' => 'nullable|image|max:2048',
            'position' => 'nullable|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'social_link' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $oldPath = $teamMember->image_path_storage;
            if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('images/team', 'public');
            $validated['image_path'] = $path;
        }
        unset($validated['image']);
        if (array_key_exists('sort_order', $validated)) {
            $validated['sort_order'] = (int) $validated['sort_order'];
        }

        $teamMember->update($validated);

        return redirect()->route('admin.team.index')->with('success', 'Team member updated successfully.');
    }

    public function destroy(TeamMember $teamMember)
    {
        $path = $teamMember->image_path_storage;
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
        $teamMember->delete();

        return redirect()->route('admin.team.index')->with('success', 'Team member removed.');
    }
}
