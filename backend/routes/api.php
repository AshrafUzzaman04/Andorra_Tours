<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\CardCategoryController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ChatMessageController;
use App\Http\Controllers\Api\HeaderController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\InveranoController;
use App\Http\Controllers\Api\Language;
use App\Http\Controllers\Api\OfferBannerController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VeranoController;
use App\Http\Middleware\AuthKeyCheck;
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

    //experience de verano
    Route::apiResource("verano",VeranoController::class);
    Route::apiResource("inverano",InveranoController::class);

    Route::apiResource("promotion",OfferBannerController::class);

    Route::apiResource("service",ServiceController::class);

    Route::apiResource("card-category",CardCategoryController::class);

    //search chat participants
    Route::apiResource('messages',ChatMessageController::class);
    Route::post('sent-message',[ChatMessageController::class,'store']);
    Route::get("search-participation/{query}",[ChatController::class, "searchParticipation"]);
    Route::get("chat-participation",[ChatController::class, "index"]);
    Route::get("unread-messages",[ChatMessageController::class, "UnreadMessages"]);
    Route::post("seen-messages/{senderId}",[ChatMessageController::class, "SeenMessages"]);
    Route::get("message/receiver/{receiverId}",[ChatMessageController::class, "MessageReceiver"]);
});

Route::prefix("frontend")->middleware(AuthKeyCheck::class)->group(function(){
    Route::get("header",[HeaderController::class, 'Header']);
    Route::get("hero-sliders",[HeroController::class, 'Hero']);
    Route::get("verano",[VeranoController::class, 'Verano']);
    Route::get("inverano",[InveranoController::class, 'Inverano']);
    Route::get("promotions",[OfferBannerController::class, 'Promotion']);
    Route::get("services",[ServiceController::class, 'Services']);
    Route::get("cardCategory",[CardCategoryController::class, 'cardCategory']);
    
});
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
