<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

Route::middleware('guest')->post('/register', [TokenController::class, 'register']);
Route::middleware('guest')->post('/login', [TokenController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [TokenController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/verifytoken', [TokenController::class, 'verifyToken']);
Route::middleware('auth:sanctum')->post('/account', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->post('/profile', [ProfileController::class, 'store']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
