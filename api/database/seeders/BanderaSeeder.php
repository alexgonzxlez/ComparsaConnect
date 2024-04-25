<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Bandera;

class BanderaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bandera::create(['name' => 'La grupa']); 
        Bandera::create(['name' => 'Falcons']);
        Bandera::create(['name' => 'Dansaires']);
    }
}
