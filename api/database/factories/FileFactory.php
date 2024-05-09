<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\File>
 */
class FileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'filepath' => 'noimage.png',
            'filesize' => $this->faker->numberBetween(1000, 100000), // Assuming filesize is a random number between 1000 and 100000
        ];
    }
}
