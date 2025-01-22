<?php

use App\Enums\RoleTypeEnum;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SurveyController;
use App\Http\Middleware\Cors;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([Cors::class])->group(function () {
    // only allow for authorized user
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/seedsurveys', [SurveyController::class, 'seedSurveys'])
            ->middleware('can:is-admin');
        Route::get('/me', [AuthController::class, 'me']);
        Route::get('/profile/{name?}', [AuthController::class, 'profile']);
        Route::put('/profile/edit/{user:user_name}', [AuthController::class, 'updateProfile']);
        Route::apiResource('survey', SurveyController::class);
        Route::apiResource('car', CarController::class)->except([
            'index',
        ]);
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/user-cars/{cate?}', [CarController::class, 'userCars']);
        Route::get('/user-cars-filter', [CarController::class, 'filterCars']);
        Route::get('/seed-cars', [CarController::class, 'seedCars']);
    });

    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    // laravel will try to query survey by slug (following type model Survey) 
    Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);
    Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);
});

Route::get('/cars', [CarController::class, 'index']);
Route::get('/car-show/{car}', [CarController::class, 'show']);
Route::get('/cars/filter', [CarController::class, 'filterCars']);
Route::get('/cars/{category}', [CarController::class, 'subCategoryCars']);
Route::get('/get-new-cars', [CarController::class, 'newCars']);

Route::post('/csrf-token', function () {
    // refresh csrf token
    Session::regenerateToken();
    return response()->json(['csrfToken' => csrf_token()]);
});

Route::post('/seed-user-admin', function () {
    $oldAdmin = User::where('user_name', 'admin')
        ->first();

    if ($oldAdmin) {
        // delete all record in table user_roles where user_id == oldAdmin->id
        $oldAdmin->roles()->detach();
        // delete record oldAdmin in table users
        $oldAdmin->delete();
    }

    $user = User::create([
        'email' => 'admin@example.com',
        'name' => 'administrator',
        'user_name' => 'admin',
        'phone' => fake()->numerify('#########'),
        'email_verified_at' => now(),
        'password' => Hash::make('admin123'),
        'remember_token' => Str::random(10),
    ]);

    // get role admin
    $roleAdmin = Role::where('name', 'Admin')->first();
    // add new record in table user_roles with user_id, role_id 
    $user->roles()->attach($roleAdmin->id);

    return response('', 200);
});