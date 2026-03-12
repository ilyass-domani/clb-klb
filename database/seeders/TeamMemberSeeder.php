<?php

namespace Database\Seeders;

use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class TeamMemberSeeder extends Seeder
{
    /**
     * Copy public image to Storage and return relative path, or null.
     */
    private function copyToStorage(?string $publicPath): ?string
    {
        if (!$publicPath || !str_starts_with($publicPath, '/images/')) {
            return $publicPath ?: null;
        }
        $relative = ltrim($publicPath, '/'); // images/team/xxx.jpg
        $fullPath = public_path($relative);
        if (!File::isFile($fullPath)) {
            return null;
        }
        $storageRelative = 'images/team/' . basename($fullPath);
        Storage::disk('public')->put($storageRelative, File::get($fullPath));
        return $storageRelative;
    }

    public function run(): void
    {
        TeamMember::query()->delete();

        $bureau = [
            [
                'name' => 'Merouane Touali',
                'category' => 'bureau',
                'image_path' => '/images/team/Merouane-Touali.jpg',
                'position' => 'Président',
                'sort_order' => 0,
                'social_link' => "https://www.linkedin.com/in/merouane-touali-9630835/",
            ],
            [
                'name' => 'Nadia Sentissi',
                'category' => 'bureau',
                'image_path' => '/images/team/Nadia-Sentissi.jpg',
                'position' => 'Vice-présidente',
                'sort_order' => 1,
                'social_link' => null,
            ],
            [
                'name' => 'Ali Serhrouchni',
                'category' => 'bureau',
                'image_path' => null,
                'position' => 'Vice-président',
                'sort_order' => 2,
                'social_link' => null,
            ],
            [
                'name' => 'Grégory Van Bellinghen',
                'category' => 'bureau',
                'image_path' => null,
                'position' => 'Secrétaire-général',
                'sort_order' => 3,
                'social_link' => null,
            ],
            [
                'name' => 'Christian Jonniaux',
                'category' => 'bureau',
                'image_path' => null,
                'position' => 'Trésorier',
                'sort_order' => 4,
                'social_link' => null,
            ],
            [
                'name' => 'Sarah Bentefrit',
                'category' => 'bureau',
                'image_path' => '/images/team/Sarah-Bentefrit.jpg',
                'position' => 'Assesseure',
                'sort_order' => 5,
                'social_link' => null,
            ],
            [
                'name' => 'Abdessamad Ben Moumen',
                'category' => 'bureau',
                'image_path' => '/images/team/Abdessamad-Ben-Moumen.jpg',
                'position' => 'Assesseur',
                'sort_order' => 6,
                'social_link' => null,
            ],
        ];

        $honorary = [
            [
                'name' => 'Driss El Yazami',
                'category' => 'honorary',
                'image_path' => '/images/team/Driss-ElYazami.jpg',
                'position' => 'Président du Conseil de la communauté marocaine à l\'étranger – CCME',
                'sort_order' => 0,
                'social_link' => null,
            ],
            [
                'name' => 'Mohamed Rhachi',
                'category' => 'honorary',
                'image_path' => '/images/team/Mohamed-Rhachi-Universite-Mohammed-V.jpg',
                'position' => "Président de l'Université Mohammed V de Rabat",
                'sort_order' => 1,
                'social_link' => null,
            ],
            [
                'name' => 'Gilles Heyvaert',
                'category' => 'honorary',
                'image_path' => '/images/team/Gilles-Heyvaert-Ambassadeur.jpg',
                'position' => "Ambassadeur du Royaume de Belgique au Maroc",
                'sort_order' => 2,
                'social_link' => null,
            ],
            [
                'name' => 'Chiraz El Fassi',
                'category' => 'honorary',
                'image_path' => '/images/team/Chiraz-Delegation-Wallonie-Bruxelles.jpg',
                'position' => 'Déléguée-générale Wallonie-Bruxelles au Maroc',
                'sort_order' => 3,
                'social_link' => null,
            ],
            [
                'name' => 'François de Vrije',
                'category' => 'honorary',
                'image_path' => '/images/team/François-DeVrije-Hub-Brussels.jpg',
                'position' => 'Représentant de la Région de Bruxelles-Capitale au Maroc',
                'sort_order' => 4,
                'social_link' => null,
            ],
        ];

        foreach (array_merge($bureau, $honorary) as $member) {
            $imagePath = $this->copyToStorage($member['image_path'] ?? null);
            $member['image_path'] = $imagePath;
            TeamMember::create($member);
        }
    }
}
