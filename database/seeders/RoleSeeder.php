<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
    }
}
