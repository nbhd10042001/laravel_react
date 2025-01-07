<?php

namespace App\Policies;

use App\Models\Survey;
use App\Models\User;

class SurveyPolicy
{
    /**
     * Create a new policy instance.
     */
    public function store(User $user)
    {
        $role = $user->roles[0]->name;
        if($role == 'Admin' || $role == 'Seller'){
            return true;
        }
        else{
            return false;
        }
    }

    public function update(User $user, Survey $survey)
    {
        $role = $user->roles[0]->name;
        if($role == 'Admin' || $role == 'Seller'){
            return true;
        }
        else{
            return false;
        }
    }

    public function show(User $user, Survey $survey)
    {
        $role = $user->roles[0]->name;
        if($role == 'Admin' || $role == 'Seller'){
            return true;
        }
        else{
            return false;
        }
    }
}
