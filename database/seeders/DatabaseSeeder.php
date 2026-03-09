<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => env('SEEDER_USER_NAME'),
            'email' => env('SEEDER_USER_EMAIL'),
            'password' => env('SEEDER_USER_PASSWORD'),
            'role' => env('SEEDER_USER_ROLE'),
        ]);

        $this->call([
            EventSeeder::class,
            TeamMemberSeeder::class,
            PartnerSeeder::class,
        ]);
    }
}
