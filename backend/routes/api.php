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
use App\Http\Controllers\Api\MapController;
use App\Http\Controllers\Api\MultipleController;
use App\Http\Controllers\Api\OfferBannerController;
use App\Http\Controllers\Api\PageCategoryController;
use App\Http\Controllers\Api\PartnersController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ProviderController;
use App\Http\Controllers\Api\ResortsController;
use App\Http\Controllers\Api\SectionHeadingController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SocialLinksController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VeranoController;
use App\Http\Controllers\Api\VeranoDetailsController;
use App\Http\Controllers\Api\WebcamsController;
use App\Http\Controllers\Api\WhyTravelController;
use App\Http\Controllers\BookingExportController;
use App\Http\Controllers\CuponCodeController;
use App\Http\Controllers\SeoSettingsController;
use App\Http\Controllers\ServiceNewsletterController;
use App\Http\Middleware\AuthKeyCheck;
use App\Models\Booking;
use App\Models\CompanyPromotion;
use App\Models\FooterDetails;
use App\Models\Header;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Route;

Route::post("user/registration", [UserController::class, 'store']);
Route::post("user/login", [AdminController::class, 'login']);

// Route::get("invoice", function (int $id = 14) {
//     $booking = Booking::where("id", $id)->with("customer")->first();
//     $details = FooterDetails::where("id", 1)->first();
//     $promotions = CompanyPromotion::where("content_for", "section_two")->first();
//     $header = Header::where("id", 1)->first();

//     return view("invoice", compact("booking", "details", "promotions", "header"));
// });

// Route::get("invoice/s", function (int $id = 14) {
//     $booking = Booking::where("id", $id)->with("customer")->first();
//     $details = FooterDetails::where("id", 1)->first();
//     $promotions = CompanyPromotion::where("content_for", "section_two")->first();
//     $header = Header::where("id", 1)->first();

//     $pdf = Pdf::loadView('invoice', compact('booking', 'details', "promotions", "header"));
//     return $pdf->download('invoice.pdf');
// });

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource("users", UserController::class);
    Route::prefix("admin")->group(function () {
        Route::get("details", [AdminController::class, 'details']);
        Route::post("logout", [AdminController::class, 'logout']);
        Route::post("update/password", [AdminController::class, 'passwordUpdate']);
    });

    Route::post("optimize", [AdminController::class, 'optimize']);

    Route::apiResource('admins', AdminController::class);
    Route::apiResource('user', UserController::class);
    Route::apiResource("categories", CategoryController::class);
    Route::apiResource("sub_categories", SubCategoryController::class);
    Route::get('sub-categories/all', [SubCategoryController::class, 'getSubcategories']);

    // Coupon Codes Api Routes
    Route::apiResource("coupons", CuponCodeController::class);

    // Seo Settings
    Route::apiResource("seo-settings", SeoSettingsController::class);

    // booking exports
    Route::get('/bookings/export', [BookingExportController::class, 'export']);

    Route::get('/booking/{id}/invoice/download', [BookingController::class, "downloadInvoice"]);

    // booking manual payment update
    Route::post("/booking/manual-pay/{id}", [BookingController::class, "manualPaymentByAdmin"]);

    // Service Newsletter
    Route::apiResource("service-newsletter", ServiceNewsletterController::class);

    //theme customizations
    Route::apiResource('headers', HeaderController::class);
    Route::apiResource('languages', Language::class);
    Route::get('getAllLanguages/{languageCode}/translations.json', [Language::class, 'getLanguageFile']);
    Route::get("language", [Language::class, "getLanguage"]);
    Route::get("LanguageFile/{id}", [Language::class, "LanguageFile"]);
    Route::get("getTranslationByKey/{languageCode}/{key}", [Language::class, "getTranslationByKey"]);
    Route::post("updateTranslation/{languageCode}", [Language::class, "updateTranslation"]);
    Route::post("deleteTranslation/{languageCode}/{key}", [Language::class, "deleteTranslation"]);



    Route::apiResource("hero-sliders", HeroController::class);
    Route::get("hero-sliders/serach/{searchKey}", [HeroController::class, 'serach']);

    //experience de verano
    Route::apiResource("verano", VeranoController::class);
    Route::get("veranos", [VeranoController::class, 'create']);
    Route::apiResource("veranoDeatils", VeranoDetailsController::class);

    Route::apiResource("inverano", InveranoController::class);

    Route::apiResource("promotion", OfferBannerController::class);

    Route::apiResource("service", ServiceController::class);

    Route::apiResource("card-category", CardCategoryController::class);
    //Route::post("card-category/{id}",[CardCategoryController::class, 'update']);


    //search chat participants
    Route::apiResource('messages', ChatMessageController::class);
    Route::post('sent-message', [ChatMessageController::class, 'store']);
    Route::get("search-participation/{query}", [ChatController::class, "searchParticipation"]);
    Route::get("chat-participation", [ChatController::class, "index"]);
    Route::get("unread-messages", [ChatMessageController::class, "UnreadMessages"]);
    Route::post("seen-messages/{senderId}", [ChatMessageController::class, "SeenMessages"]);
    Route::get("message/receiver/{receiverId}", [ChatMessageController::class, "MessageReceiver"]);

    //advertisement
    Route::apiResource("advertisements", AdvertisementController::class);
    Route::apiResource("why-travels", WhyTravelController::class);
    Route::apiResource("testimonial", TestimonialController::class);

    Route::apiResource("footer-details", FooterDetailsController::class);
    Route::apiResource("page-category", PageCategoryController::class);
    Route::get("page-categories", [PageCategoryController::class, "pageCategories"]);

    Route::apiResource("footer-pages", FooterPageController::class);
    Route::apiResource("footer-partners", PartnersController::class);
    Route::apiResource("footer-social-link", SocialLinksController::class);

    Route::post("section-heading", [SectionHeadingController::class, "store"]);
    Route::get("section-heading/{heading_for}", [SectionHeadingController::class, "show"]);

    //form create
    Route::apiResource("form", FormBuilderController::class);

    //hotel
    Route::apiResource("hotels", HotelController::class);
    Route::get("hotel/create", [HotelController::class, 'create']);


    //multiple
    Route::apiResource("multiples", MultipleController::class);
    Route::get("multiple/{for}", [MultipleController::class, 'create']);

    //blog route start will be from here
    Route::apiResource("blogs", BlogController::class);

    //partners company
    Route::apiResource("company-promotions", CompanyPromotionController::class);
    //providers
    Route::apiResource("providers", ProviderController::class);
    //webcams
    Route::apiResource("webcams", WebcamsController::class);
    Route::get("webcam-provider", [WebcamsController::class, "create"]);

    //resorts
    Route::apiResource("resorts", ResortsController::class);
    Route::get("resorts-provider", [ResortsController::class, "create"]);

    //map route
    Route::apiResource("maps", MapController::class);
    Route::get("map/show", [MapController::class, "show"]);


    //bookings
    Route::apiResource('bookings', BookingController::class);
    Route::post("booking/canceled/{id}", [BookingController::class, 'cancelBooking']);
    Route::post("booking/payment-link/{id}", [PaymentController::class, 'sendPaymentLink']);
    //footer
});
Route::post("booking/notification", [BookingController::class, 'notification']);
Route::prefix("frontend")->middleware(AuthKeyCheck::class)->group(function () {
    Route::get("header", [HeaderController::class, 'Header']);
    Route::get("hero-sliders", [HeroController::class, 'Hero']);
    Route::get("verano", [VeranoController::class, 'Verano']);
    Route::get("inverano", [InveranoController::class, 'Inverano']);
    Route::get("promotions", [OfferBannerController::class, 'Promotion']);
    Route::get("services", [ServiceController::class, 'Services']);
    Route::get("services/{slug}", [ServiceController::class, 'ServicesBySlug']);
    Route::get("cardCategory", [CardCategoryController::class, 'cardCategory']);
    Route::get("cardCategory/{slug}", [CardCategoryController::class, 'cardCategoryBySlug']);
    Route::get("top-hotels/{slug}", [CardCategoryController::class, 'slugBaseHotels']);
    Route::get("advertisements", [AdvertisementController::class, "getAdvertisement"]);
    Route::get("why-travels", [WhyTravelController::class, "getWhyTravels"]);
    Route::get("testimonials", [TestimonialController::class, "getTestimonials"]);
    Route::get("footer", [FooterController::class, "index"]);
    Route::get("page/{slug}", [FooterPageController::class, 'SlugBase']);
    Route::get("verano/{slug}", [VeranoController::class, 'VeranoBySlug']);
    Route::get("inverano/{slug}", [InveranoController::class, 'InveranoBySlug']);

    // check coupon code
    Route::get("coupons/{slug}/check", [CuponCodeController::class, 'verifyCouponCode']);

    Route::get("category/{slug}/details", [CategoryController::class, "categoryDetails"]);

    Route::post("price", [BookingController::class, "PriceByDay"]);

    Route::get("hotel/{slug}", [HotelController::class, 'slugByHotel']);
    Route::get("parent/{slug}", [HotelController::class, 'parentSlugByData']);

    Route::get("multiple/{for}", [MultipleController::class, 'create']);

    Route::get("product/{slug}", [MultipleController::class, "slugByProduct"]);
    Route::post("product/price", [BookingController::class, "ProductPriceByDay"]);

    //blog route start will be from here
    Route::get("latest-blogs", [BlogController::class, 'latestBlogs']);
    Route::get("blogs", [BlogController::class, 'Blogs']);
    Route::get("blogs/{slug}", [BlogController::class, 'SlugByBlog']);

    // seo settings data get
    Route::get("seo-settings/pagename/{name}", [SeoSettingsController::class, "getByPageName"]);

    // submit newsletter service form
    Route::post("service-newsletter/formSubmit", [ServiceNewsletterController::class, "formSubmit"]);

    //partners
    Route::get('promotion-partners', [CompanyPromotionController::class, 'getPartners']);

    //providers
    Route::get('providers/{provider}', [ProviderController::class, 'getProviders']);

    //slug base resorts
    Route::get('resorts/{slug}', [ResortsController::class, 'slugByResorts']);

    Route::apiResource('bookings', BookingController::class);
    Route::post("booking/status/{orderId}", [BookingController::class, 'updateByOrderId']);
    Route::get("booking/{orderId}", [BookingController::class, 'getBookingsByOrderId']);
});