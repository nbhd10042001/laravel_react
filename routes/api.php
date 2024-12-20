<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\SurveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/seedsurveys', [SurveyController::class, 'seedSurveys']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::apiResource('survey', SurveyController::class);
    Route::apiResource('car', CarController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
