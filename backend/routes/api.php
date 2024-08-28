<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\HeaderController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\Language;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("user/registration",[UserController::class, 'store']);
Route::post("user/login",[AdminController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::apiResource("users",UserController::class);
    Route::prefix("admin")->group(function(){
        Route::get("details",[AdminController::class, 'details']);
        Route::post("logout",[AdminController::class, 'logout']);
        Route::post("update/password",[AdminController::class, 'passwordUpdate']);
    });
    Route::apiResource('admins',AdminController::class);
    Route::apiResource('user',UserController::class);
    Route::apiResource("categories",CategoryController::class);
    Route::apiResource("sub_categories",SubCategoryController::class);
    Route::get('sub-categories/all', [SubCategoryController::class, 'getSubcategories']);

    //theme customizations
    Route::apiResource('headers',HeaderController::class);
    Route::apiResource('languages',Language::class);
    Route::get('getAllLanguages/{languageCode}/translations.json', [Language::class, 'getLanguageFile']);

    Route::apiResource("hero-sliders",HeroController::class);
    Route::get("hero-sliders/serach/{searchKey}",[HeroController::class, 'serach']);
});

Route::prefix("frontend")->group(function(){
    Route::get("hero-sliders",[HeroController::class, 'Hero']);
});
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
