<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Survey>
 */
class SurveyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'image' => null,
            'title' => fake()->title()." [FakeData]",
            'slug' => fake()->slug(),
            'status' => true,
            'description' => fake()->text(400),
            'expire_date' => fake()->optional(0.9)
                ->dateTimeBetween('+1 day', '+1 month'),
            'created_at' => fake()->dateTime(),
            'updated_at' => fake()->dateTime(),
        ];
    }
}
