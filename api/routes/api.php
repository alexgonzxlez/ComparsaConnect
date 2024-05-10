<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\MatchController;
use App\Http\Controllers\FriendshipController;
use App\Http\Controllers\ProfileController; 
use App\Http\Controllers\UserController; 
use App\Http\Controllers\AdminController; 

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;

Route::middleware('guest')->post('/register', [TokenController::class, 'register']);
Route::middleware('guest')->post('/login', [TokenController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [TokenController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/user', [TokenController::class, 'user']);
Route::middleware('auth:sanctum')->post('/account', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->get('/profile', [ProfileController::class, 'index']);
Route::middleware('auth:sanctum')->post('/profile', [ProfileController::class, 'store']);
Route::middleware('auth:sanctum')->post('/profile/{id}', [ProfileController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/profile', [ProfileController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/users/search', [FriendshipController::class, 'search']);
Route::middleware('auth:sanctum')->post('/send-friend/{recipient}', [FriendshipController::class, 'sendFriendRequest']);
Route::middleware('auth:sanctum')->post('/accept-friend/{friend}', [FriendshipController::class, 'acceptFriendRequest']);
Route::middleware('auth:sanctum')->delete('/cancel-friend/{friend}', [FriendshipController::class, 'cancelFriendRequest']);
Route::middleware('auth:sanctum')->delete('/delete-friend/{friend}', [FriendshipController::class, 'removeFriend']);
Route::middleware('auth:sanctum')->get('/friend-request', [FriendshipController::class, 'getFriendRequest']);
Route::middleware('auth:sanctum')->get('/friends', [FriendshipController::class, 'getfriends']);
Route::middleware('auth:sanctum')->get('/pending-request', [FriendshipController::class, 'getPendingRequest']);
Route::middleware('auth:sanctum')->delete('/user', [UserController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/find-match', [MatchController::class, 'matches']);
Route::middleware('auth:sanctum')->post('/send-match/{recipient}', [MatchController::class, 'match']);
Route::middleware('auth:sanctum')->post('/reject-match/{recipient}', [MatchController::class, 'rejectMatch']);
Route::middleware('auth:sanctum')->get('/moderate-users', [AdminController::class, 'getUsers']);
Route::middleware('auth:sanctum')->post('/ban-user/{id}', [AdminController::class, 'banUser']);
Route::middleware('auth:sanctum')->delete('/unban-user/{id}', [AdminController::class, 'unbanUser']);
Route::middleware('auth:sanctum')->get('/moderate-banned-users', [AdminController::class, 'getBanedUsers']);

Route::middleware('auth:sanctum')->get('/home', [HomeController::class, 'index'])->name('home');
Route::middleware('auth:sanctum')->get('/messages', [HomeController::class, 'messages'])->name('messages');
Route::middleware('auth:sanctum')->post('/message', [HomeController::class, 'message'])->name('message');