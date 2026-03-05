<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

         $events = [
            [
                'title'       => "F'tor-Débat : Leadership Féminin, Réalités Et Défis",
                'description' => "Rencontre exceptionnelle avec Dr Younes Sakkouri, Ministre de l'Inclusion...",
                'date'        => '2026-03-06',
                'time'        => '17:30:00',
                'categorie'   => 'Conférence',
                'price'       => 300,
                'image'       => 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
                'location'    => 'Cinéma Renaissance, Rabat',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Gala Annuel des Lauréats de Belgique',
                'description' => "Célébrez l'excellence et l'amitié maroco-belge lors de notre prestigieux gala annuel. Dîner...",
                'date'        => '2026-04-15',
                'time'        => '19:00:00',
                'categorie'   => 'Gala',
                'price'       => 0,
                'image'       => 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
                'location'    => 'Hôtel Sofitel, Casablanca',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
            [
                'title'       => 'Afterwork B2B : Synergies Économiques',
                'description' => 'Une soirée de réseautage dédiée aux entrepreneurs et cadres dirigeants pour créer de...',
                'date'        => '2026-05-28',
                'time'        => '18:30:00',
                'categorie'   => 'Networking',
                'price'       => 0,
                'image'       => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
                'location'    => 'The View Hotel, Rabat',
                'created_at'  => now(),
                'updated_at'  => now(),
            ],
        ];

        DB::table('events')->insert($events);

    }
}
