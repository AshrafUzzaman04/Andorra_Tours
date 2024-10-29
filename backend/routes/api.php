<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AdvertisementController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CardCategoryController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ChatMessageController;
use App\Http\Controllers\Api\CompanyPromotionController;
use App\Http\Controllers\Api\FooterController;
use App\Http\Controllers\Api\FooterDetailsController;
use App\Http\Controllers\Api\FooterPageController;
use App\Http\Controllers\Api\FormBuilderController;
use App\Http\Controllers\Api\HeaderController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\HotelController;
use App\Http\Controllers\Api\InveranoController;
use App\Http\Controllers\Api\Language;
use App\Http\Controllers\Api\MultipleController;
use App\Http\Controllers\Api\OfferBannerController;
use App\Http\Controllers\Api\PageCategoryController;
use App\Http\Controllers\Api\PartnersController;
use App\Http\Controllers\Api\SectionHeadingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SocialLinksController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VeranoController;
use App\Http\Controllers\Api\VeranoDetailsController;
use App\Http\Controllers\Api\WhyTravelController;
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
    Route::get("language",[Language::class, "getLanguage"]);
    Route::get("LanguageFile/{id}",[Language::class, "LanguageFile"]);
    Route::get("getTranslationByKey/{languageCode}/{key}",[Language::class, "getTranslationByKey"]);
    Route::post("updateTranslation/{languageCode}",[Language::class, "updateTranslation"]);
    Route::post("deleteTranslation/{languageCode}/{key}",[Language::class, "deleteTranslation"]);



    Route::apiResource("hero-sliders",HeroController::class);
    Route::get("hero-sliders/serach/{searchKey}",[HeroController::class, 'serach']);

    //experience de verano
    Route::apiResource("verano",VeranoController::class);
    Route::get("veranos",[VeranoController::class, 'create']);
    Route::apiResource("veranoDeatils",VeranoDetailsController::class);

    Route::apiResource("inverano",InveranoController::class);

    Route::apiResource("promotion",OfferBannerController::class);

    Route::apiResource("service",ServiceController::class);

    Route::apiResource("card-category",CardCategoryController::class);
    //Route::post("card-category/{id}",[CardCategoryController::class, 'update']);

    //search chat participants
    Route::apiResource('messages',ChatMessageController::class);
    Route::post('sent-message',[ChatMessageController::class,'store']);
    Route::get("search-participation/{query}",[ChatController::class, "searchParticipation"]);
    Route::get("chat-participation",[ChatController::class, "index"]);
    Route::get("unread-messages",[ChatMessageController::class, "UnreadMessages"]);
    Route::post("seen-messages/{senderId}",[ChatMessageController::class, "SeenMessages"]);
    Route::get("message/receiver/{receiverId}",[ChatMessageController::class, "MessageReceiver"]);

    //advertisement
    Route::apiResource("advertisements",AdvertisementController::class);
    Route::apiResource("why-travels",WhyTravelController::class);
    Route::apiResource("testimonial",TestimonialController::class);

    Route::apiResource("footer-details",FooterDetailsController::class);
    Route::apiResource("page-category",PageCategoryController::class);
    Route::get("page-categories",[PageCategoryController::class, "pageCategories"]);

    Route::apiResource("footer-pages",FooterPageController::class);
    Route::apiResource("footer-partners",PartnersController::class);
    Route::apiResource("footer-social-link",SocialLinksController::class);

    Route::post("section-heading",[SectionHeadingController::class,"store"]);
    Route::get("section-heading/{heading_for}",[SectionHeadingController::class,"show"]);

    //form create
    Route::apiResource("form",FormBuilderController::class);

    //hotel
    Route::apiResource("hotels",HotelController::class);
    Route::get("hotel/create",[HotelController::class, 'create']);


    //multiple
    Route::apiResource("multiples",MultipleController::class);
    Route::get("multiple/{for}",[MultipleController::class, 'create']);

    //blog route start will be from here
    Route::apiResource("blogs",BlogController::class);

    //partners company
    Route::apiResource("company-promotions",CompanyPromotionController::class);
    //footer
});

Route::prefix("frontend")->middleware(AuthKeyCheck::class)->group(function(){
    Route::get("header",[HeaderController::class, 'Header']);
    Route::get("hero-sliders",[HeroController::class, 'Hero']);
    Route::get("verano",[VeranoController::class, 'Verano']);
    Route::get("inverano",[InveranoController::class, 'Inverano']);
    Route::get("promotions",[OfferBannerController::class, 'Promotion']);
    Route::get("services",[ServiceController::class, 'Services']);
    Route::get("services/{slug}",[ServiceController::class, 'ServicesBySlug']);
    Route::get("cardCategory",[CardCategoryController::class, 'cardCategory']);
    Route::get("cardCategory/{slug}",[CardCategoryController::class, 'cardCategoryBySlug']);
    Route::get("top-hotels/{slug}",[CardCategoryController::class, 'slugBaseHotels']);
    Route::get("advertisements",[AdvertisementController::class,"getAdvertisement"]);
    Route::get("why-travels",[WhyTravelController::class,"getWhyTravels"]);
    Route::get("testimonials",[TestimonialController::class,"getTestimonials"]);
    Route::get("footer",[FooterController::class,"index"]);
    Route::get("page/{slug}",[FooterPageController::class, 'SlugBase']);
    Route::get("verano/{slug}",[VeranoController::class, 'VeranoBySlug']);
    Route::get("inverano/{slug}",[InveranoController::class, 'InveranoBySlug']);

    Route::post("price",[BookingController::class,"PriceByDay"]);

    Route::get("hotel/{slug}",[HotelController::class, 'slugByHotel']);
    Route::get("parent/{slug}",[HotelController::class, 'parentSlugByData']);
    
    Route::get("multiple/{for}",[MultipleController::class, 'create']);

    Route::get("product/{slug}",[MultipleController::class,"slugByProduct"]);
    Route::post("product/price",[BookingController::class,"ProductPriceByDay"]);

    //blog route start will be from here
    Route::get("blogs",[BlogController::class, 'Blogs']);
    Route::get("blogs/{slug}",[BlogController::class, 'SlugByBlog']);


 
});
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
