<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Maker;
use App\Models\Model;
use App\Models\Permission;
use App\Models\Role;
use App\Models\State;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $permissions = [
            1 => 'dashboard',
            2 => 'editor',
            3 => 'view',
        ];
        $roles = [
            'Admin' => [$permissions[1], $permissions[2], $permissions[3]],
            'Seller' => [$permissions[2], $permissions[3]],
            'Member' => [$permissions[3]],
        ];

        foreach ($roles as $role => $pers) {
            // get old role 
            $oldRole = Role::where('name', $role)->first();
            // delete old role and permissions of old role
            if ($oldRole) {
                $oldRole->permissions()->delete();
                $oldRole->delete();
            }

            // create new role and permissions of new role
            Role::factory()
                ->state(['name' => $role])
                ->has(
                    Permission::factory()
                        ->count(count($pers))
                        ->sequence(...array_map(
                            fn($per) => ['name' => $per],
                            $permissions
                        ))
                )
                ->create();
        }

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
                ->state(['name' => $maker, 'image' => 'images/car/logo_maker/'.$maker.'_logo.png'])
                ->has(Model::factory()
                        ->count(count($models))
                        ->sequence(...array_map(fn ($model) => ['name' => $model],
                            $models
                        ))
                )
                ->create();
        }
    }
}
