<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CardCategoryStore;
use App\Http\Requests\CardCategoryUpdate;
use App\Models\CardCategory;
use App\Models\SectionHeading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CardCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cardCategories = CardCategory::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $cardCategories]);
    }

    public function cardCategory()
    {
        $heading = SectionHeading::where("heading_for", "servcios-exclusivos")->first();
        $cardCategories = CardCategory::where("status", "Active")->get();
        return response()->json(["message" => "success", "data" => $cardCategories, 'heading' => $heading], 200);
    }

    public function cardCategoryBySlug($slug)
    {
        $cardCategorie = CardCategory::where("status", "Active")->where('slug', $slug)->first();
        return response()->json(["message" => "success", "data" => $cardCategorie], 200);
    }

    public function slugBaseHotels($slug, Request $request)
    {
        // Get the items per page from request, default to 10
        $itemsPerPage = $request->input('per_page', 10);

        // Fetch the category with active status and slug
        $categorie = CardCategory::where("status", "Active")->where("slug", $slug)->first();

        // If category is not found, return an error response
        if (!$categorie) {
            return response()->json(["message" => "Category not found"], 200);
        }

        // Initialize the query for hotels related to the category
        $hotelsQuery = $categorie->hotels();

        // Apply filters based on query parameters
        if ($request->has('location')) {
            $hotelsQuery->where('location', $request->input('location'));
        }

        if ($request->has('hotel_type')) {
            $hotelsQuery->where('tag', $request->input('hotel_type'));
        }

        if ($request->has('review')) {
            $reviewThreshold = $request->input('review');
            $hotelsQuery->where('review', '>=', $reviewThreshold); // Filter by review rating
        }

        // Optionally sort the results
        if ($request->has('sort_by')) {
            $sortBy = $request->input('sort_by');
            $sortOrder = $request->input('sort_order', 'asc'); // Default to ascending order
            if ($sortBy == "total_review") {
                $hotelsQuery->orderByRaw('CAST(total_review AS UNSIGNED) DESC');
            } elseif ($sortBy == "review") {
                $hotelsQuery->orderByRaw('CAST(review AS DECIMAL(10,2)) DESC');
            } else {
                $hotelsQuery->orderBy($sortBy, $sortOrder);
            }
        }

        // Paginate the hotels
        $hotels = $hotelsQuery->paginate($itemsPerPage);

        // Count the number of hotels by location
        $locationsCount = $categorie->hotels()
            ->select('location', DB::raw('count(*) as count'))
            ->groupBy('location')
            ->get();

        // Count the number of hotels by hotel type
        $hotelTypesCount = $categorie->hotels()
            ->select('tag as hotel_type', DB::raw('count(*) as count'))
            ->groupBy('tag')
            ->get();

        // Count the number of hotels by review rating
        $reviewsCount = $categorie->hotels()
            ->select('review', DB::raw('count(*) as count'))
            ->groupBy('review')
            ->orderBy('review', 'desc') // Order by the count in descending order
            ->get();

        // Assign paginated hotels to the category's hotels property
        $categorie->setRelation('hotels', $hotels);

        // Return the category including paginated hotels, location counts, hotel type counts, and review counts
        return response()->json([
            "message" => "success",
            "data" => [
                "category" => $categorie,
                "locations_count" => $locationsCount,
                "hotel_types_count" => $hotelTypesCount,
                "reviews_count" => $reviewsCount, // Include review counts
            ]
        ], 200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CardCategoryStore $request)
    {
        $data = $request->validated();
        if ($request->hasFile("image")) {
            $image = "storage/" . $request->image->store("card-image");
            $data['image'] = $image;
        }

        if ($request->hasFile("tag")) {
            $tag = "storage/" . $request->tag->store("card-image");
            $data['tag'] = $tag;
        }
        CardCategory::create($data);
        return response()->json(['success' => true, "message" => "Card category created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CardCategory $cardCategory)
    {
        return response()->json(["message" => "success", "data" => $cardCategory], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CardCategoryUpdate $request, CardCategory $cardCategory)
    {
        //dd($cardCategory);
        $data = $request->validated();
        if ($request->hasFile("image")) {
            $expolde = explode("/", $cardCategory->image);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
                $image = "storage/" . $request->image->store("card-image");
                $data['image'] = $image;
            }

        }

        if ($request->hasFile("tag")) {
            $expolde = explode("/", $cardCategory->tag);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
                $tag = "storage/" . $request->tag->store("card-image");
                $data['tag'] = $tag;
            }

        }
        $cardCategory->update($data);
        return response()->json(['success' => true, "message" => "Card category updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CardCategory $cardCategory)
    {
        if ($cardCategory->image) {
            $expolde = explode("/", $cardCategory->image);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }
        if ($cardCategory->tag) {
            $expolde = explode("/", $cardCategory->tag);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }
        $cardCategory->delete();
        return response()->json(["message" => "Card category deleted successfully"], 200);
    }
}
