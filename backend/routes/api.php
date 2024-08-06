<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("user/registration",[UserController::class, 'store']);
Route::post("user/login",[AdminController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::prefix("admin")->group(function(){
        Route::get("details",[AdminController::class, 'details']);
        Route::post("logout",[AdminController::class, 'logout']);
        Route::post("update/password",[AdminController::class, 'passwordUpdate']);
    });
    Route::apiResource('admins',AdminController::class); 

});
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
