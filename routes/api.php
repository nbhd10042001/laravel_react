<?php

use App\Http\Controllers\Api\Auth\GoogleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Cors;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware([Cors::class])->group(function () {
    // only allow for authorized user
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/seedsurveys', [SurveyController::class, 'seedSurveys'])
            ->middleware('can:is-admin');
        Route::get('/me', [UserController::class, 'me']);
        Route::get('/profile/{name?}', [UserController::class, 'profile']);
        Route::put('/profile/edit/{user:user_name}', [UserController::class, 'updateProfile']);
        Route::apiResource('survey', SurveyController::class);
        Route::get('/admin/users', [UserController::class, 'getAllUser']);
        Route::apiResource('car', CarController::class)->except([
            'index',
        ]);
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/user-cars', [CarController::class, 'userCars']);
        Route::get('/user-cars-filter', [CarController::class, 'filterCars']);
        Route::get('/seed-cars', [CarController::class, 'seedCars']);
        Route::apiResource('order', OrderController::class);
        Route::get('/my-orders', [OrderController::class, 'getOrders']);

    });

    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/login', [AuthController::class, 'login']);
    // laravel will try to query survey by slug (following type model Survey) 
    Route::get('/survey/get-by-slug/{survey:slug}', [SurveyController::class, 'getBySlug']);
    Route::post('/survey/{survey}/answer', [SurveyController::class, 'storeAnswer']);

    // api for client google
    Route::get('/auth/google/redirect', [GoogleController::class, 'googleLoginRedirect']);
    Route::get('/auth/google/callback', [GoogleController::class, 'googleLoginCallback']);
});

Route::get('/cars', [CarController::class, 'index']);
Route::get('/car-show/{car}', [CarController::class, 'show']);
Route::get('/cars/filter', [CarController::class, 'filterCars']);
Route::get('/search-cars', [CarController::class, 'searchCar']);
Route::get('/get-new-cars', [CarController::class, 'newCars']);
Route::get('/get-survey-public', [SurveyController::class, 'getSurveyPublic']);

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

Route::get('/vnpay', [PaymentController::class, 'VNPayMethod']);