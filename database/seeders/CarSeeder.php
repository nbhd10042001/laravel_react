<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\CarFeatures;
use App\Models\CarImage;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * Create 3 users first, then create 2 more users 
         * and for each user (from the last 2 users) create 50 cars,
         * with image, feature and add these cars to favourite cars of these 2 users
         */
        // User::factory()->count(3)->create();

        $path = '/images/car/car_image_seed/';
        $files = Storage::disk('public')->allFiles($path);
        $lastUserId = User::orderBy('id', 'DESC')->first()->id;
        $newId = $lastUserId + 1;
        // error_log('id: '.$newId);

        User::where('name', 'LIKE', '%[Seed]%')->delete();

        User::factory()
            ->state([
                'name' => fake()->name() . "[Seed]",
                'user_name' => 'user_seed',
                'id' => $newId
            ])
            ->has(
                Car::factory()
                    ->count(50)
                    ->state(['user_id' => $newId])
                    ->has(
                        CarImage::factory()
                            ->count(5)
                            ->sequence(fn(Sequence $sequence) => [
                                'image_path' => $files[mt_rand(0, count($files) - 1)],
                                'position' => $sequence->index % 5 + 1
                            ])
                        ,
                        'images'
                    )
                    ->has(CarFeatures::factory(), 'features')
                ,
                'favouriteCars'
            )
            ->create();
    }
}
