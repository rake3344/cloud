<?php

use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\FolderController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// User Routes
Route::controller(UserController::class)->group(function (){
    Route::post('/register', [UserController::class, 'register']);
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/users', [UserController::class, 'index'])->middleware('jwt.verify');
    Route::get('/user', [UserController::class, 'show'])->middleware('jwt.verify');
});

// File Routes
Route::controller(FileController::class)->group(function() {
    Route::post('/upload/{id?}', [FileController::class, 'store'])->middleware(['jwt.verify', 'throttle:upload']);
    Route::get('/files', [FileController::class, 'index'])->middleware('jwt.verify');
    Route::delete('/file/{id}', [FileController::class, 'destroy'])->middleware('jwt.verify');
});

// Folder Routes
Route::middleware('jwt.verify')->group(function() {
    Route::post('/folder', [FolderController::class, 'store']);
    Route::get('/folder/{id}', [FolderController::class, 'show']);
});