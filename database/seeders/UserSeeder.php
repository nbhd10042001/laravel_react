<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // you need delete oldUsers after oldRoles
        // delete old seller
        User::where('name', 'LIKE', '%[Fake]%')->each(function ($oldUser) {
            $oldUser->roles()->detach();
            $oldUser->delete();
        });

        // create new users
        $users = User::factory()->count(5)->sequence(fn(Sequence $sequence) => [
            'user_name' => 'seller' . ($sequence->index % 5 + 1),
        ])->create();

        // attach role users
        $idRoleSeller = Role::where('name', 'Seller')->first()->id;
        foreach ($users as $user) {
            $user->roles()->attach($idRoleSeller);
        }
    }
}
