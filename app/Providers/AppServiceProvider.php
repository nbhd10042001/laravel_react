<?php

namespace App\Providers;

use App\Models\Survey;
use App\Models\User;
use App\Policies\SurveyPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Gate::define('is-admin', function (User $user) {
            return $user->roles[0]->name == 'Admin' ? true : false;
        });

        Gate::define('is-member', function (User $user) {
            return $user->roles[0]->name == 'Member' ? true : false;
        });

        Gate::policy(Survey::class, SurveyPolicy::class);
    }
}
