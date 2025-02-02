<?php

namespace Database\Factories;

use App\Enums\CarTypeEnum;
use App\Enums\FuelTypeEnum;
use App\Models\City;
use App\Models\Maker;
use App\Models\Model;
use App\Models\State;
use App\Models\User;
use Arr;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $maker = Maker::inRandomOrder()->first();
        $model = Model::where('maker_id', $maker->id)->inRandomOrder()->first();
        $year = fake()->year();
        $slug = $year . ' - ' . $maker->name . ' ' . $model->name;
        return [
            'maker_id' => $maker->id,
            // 'model_id' => function (array $attributes) {
            //     return Model::where('maker_id', $attributes['maker_id'])
            //     ->inRandomOrder()->first()->id;
            // },
            'model_id' => $model->id,
            'year' => $year,
            'slug' => $slug,
            'price' => ((int) fake()->randomFloat(2, 5, 100)) * 1000,
            'vin' => strtoupper(Str::random(17)),
            'mileage' => ((int) fake()->randomFloat(2, 5, 500)) * 1000,
            'user_id' => User::inRandomOrder()->first()->id,
            'car_type' => Arr::random(CarTypeEnum::cases())->value,
            'fuel_type' => Arr::random(FuelTypeEnum::cases())->value,
            'state_id' => State::inRandomOrder()->first()->id,
            'city_id' => function (array $attributes) {
                return City::where('state_id', $attributes['state_id'])
                    ->inRandomOrder()->first()->id;
            },
            'address' => fake()->address(),
            'phone' => function (array $attributes) {
                return User::find($attributes['user_id'])->phone;
            },
            'description' => fake()->text(400) . "[Fake]",
            'published_at' => fake()->optional(0.9)
                ->dateTimeBetween('-1 month', '+1 day'),
            'publish' => 0,
        ];
    }
}
