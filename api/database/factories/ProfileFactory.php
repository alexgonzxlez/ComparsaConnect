<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gender' => $this->faker->randomElement([1, 2, 3]), // Assuming gender is an enum (1 for male, 2 for female)
            'description' => $this->faker->paragraph,
            'birthdate' => $this->faker->date,
            'gender_pref' => $this->faker->randomElement([1, 2, 3]), // Assuming gender preference is an enum
            'file_id' => null, // Assuming the default value for file_id is null
            'bandera' => $this->faker->randomElement([1, 2, 3]) // Assuming the default value for bandera is null
        ];
    }
}
