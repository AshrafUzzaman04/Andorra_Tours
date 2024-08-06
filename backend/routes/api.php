<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("user/registration",[UserController::class, 'store']);
Route::post("user/login",[AdminController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function(){

});
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
