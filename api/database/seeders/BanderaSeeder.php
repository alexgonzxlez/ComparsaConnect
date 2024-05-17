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
        Bandera::create(['name' => 'Me es indiferente']); 
        Bandera::create(['name' => 'Colla de Geganters']); 
        Bandera::create(['name' => 'Falcons']);
        Bandera::create(['name' => 'Dansaires']);
        Bandera::create(['name' => 'UPC']);
        Bandera::create(['name' => 'La colla']);
        Bandera::create(['name' => 'La puput']);
        Bandera::create(['name' => 'La unió vilanovina']);
        Bandera::create(['name' => 'La roma roja']);
        Bandera::create(['name' => 'Els torrats vilanovins']);
    }
}
