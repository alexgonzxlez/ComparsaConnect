<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;
use App\Models\File;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Crear usuarios con perfiles
        User::factory()->count(21)->create()->each(function ($user) {
            $profile = Profile::factory()->create([
                'user_id' => $user->id,
            ]);

            // Crear un archivo asociado al perfil
            $file = File::factory()->create();
            $profile->file_id = $file->id;
            $profile->save();
        });
    }
}
