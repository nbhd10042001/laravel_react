<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarFeatures;
use App\Models\CarImage;
use App\Models\City;
use App\Models\Maker;
use App\Models\Model;
use App\Models\State;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create State
        $states = [
            'Califonia' => ['Los Angeles', 'San Francisco', 'San Diego'],
            'Texas' => ['Houston', 'San Antonio', 'Dallas', 'Austin'],
            'Florida' => ['Miami', 'Orlando', 'Tampa', 'JacksonVille'],
            'New York' => ['New York City', 'Buffalo', 'Rochester'],
            'Ohio' => ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo']
        ];

        foreach($states as $state => $cities) // key=state / value=cities
        {
            State::factory()
                ->state(['name' => $state])
                ->has(City::factory()
                        ->count(count($cities))
                        ->sequence(...array_map(fn ($city) => ['name' => $city],
                            $cities
                        ))
                )
                ->create();
        }

        // Create maker with there corresponding models
        $makers = [
            'Toyota' => ['Camry', 'Corolla', 'RAV4', 'Prius'],
            'Ford' => ['F-150', 'Escape', 'Mustang', 'Fusion'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'Pilot'],
            'Nissan' => ['Altima', 'Sentra', 'Rouge', 'Maxima'],
            'Lexus' => ['RX400', 'RX450', 'RX350', 'LS500'],
        ];

        foreach($makers as $maker => $models) // key - value
        {
            Maker::factory()
                ->state(['name' => $maker])
                ->has(Model::factory()
                        ->count(count($models))
                        ->sequence(...array_map(fn ($model) => ['name' => $model],
                            $models
                        ))
                )
                ->create();
        }

        /**
         * Create 3 users first, then create 2 more users 
         * and for each user (from the last 2 users) create 50 cars,
         * with image, feature and add these cars to favourite cars of these 2 users
         */

        User::factory()->count(3)->create();

        User::factory()->count(2)
            ->has(
                Car::factory()
                    ->count(50)
                    ->has(
                        CarImage::factory()
                            ->count(5)
                            ->sequence(fn(Sequence $sequence) => [
                                'position' => $sequence->index % 5 + 1])
                        , 'images'
                    )
                    ->has(CarFeatures::factory(), 'features')
                    , 'favouriteCars'
                )
            ->create();
    }
}
