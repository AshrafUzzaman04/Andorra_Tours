<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Translation;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreHotelRequest;
use App\Http\Requests\UpdateHotelRequest;
use App\Models\CardCategory;
use App\Models\Hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hotels = Hotel::with(["categorie:title,id"])->paginate(10);
        return response()->json(["message" => "success", "data" => $hotels,], 200);
    }

    public function create()
    {
        $categories = CardCategory::all();
        return response()->json(["success" => true, "categories" => $categories], 200);
    }

    public function slugByHotel(Request $request, $slug)
    {
        $hotel = Hotel::with(['categorie:id,tag,tag_slug'])->where("status", "Active")->where("slug", $slug)->first();
        return response()->json(["message" => "success", "data" => $hotel], 200);
    }

    public function parentSlugByData(Request $request, $slug)
    {

        $data = Hotel::with(['categorie:id,tag,tag_slug'])->where("status", "Active")->where("parent_slug", $slug)->paginate(10);
        return response()->json(["message" => "success", "data" => $data], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelRequest $request)
    {
        $data = $request->validated();
        $photoFields = ['photo', 'photo_one', 'photo_two', 'photo_three'];
        foreach ($photoFields as $field) {
            if ($request->hasFile($field)) {
                $imagePath = "storage/" . $request->$field->store("hotel");
                $data[$field] = $imagePath;
            }
        }
        $data['categorie_id'] = $request->categorie;
        $parent = CardCategory::find($request->categorie);
        $data['parent_slug'] = $parent->slug;
        Hotel::create($data);
        Translation::addOrUpdateTranslations($data);
        return response()->json(["success" => true, "message" => "Hotel created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        if (!$hotel)
            return response()->json(["message" => "Hotel not found",], 422);
        return response()->json(["message" => "success", "data" => $hotel], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $data = $request->validated();
        $photoFields = ['photo', 'photo_one', 'photo_two', 'photo_three'];
        foreach ($photoFields as $field) {
            if ($request->hasFile($field)) {
                $expolde = explode("/", $hotel->$field);
                $imageUrl = $expolde[1] . "/" . $expolde[2];
                if (Storage::exists($imageUrl)) {
                    Storage::delete($imageUrl);
                }
                $imagePath = "storage/" . $request->$field->store("hotel");
                $data[$field] = $imagePath;
            }
        }
        $data['categorie_id'] = $request->categorie;
        $parent = CardCategory::find($request->categorie);
        $data['parent_slug'] = $parent->slug;
        $hotel->update($data);
        Translation::addOrUpdateTranslations($data);
        return response()->json(["success" => true, "message" => "Hotel updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        $photoFields = ['photo', 'photo_one', 'photo_two', 'photo_three'];
        foreach ($photoFields as $field) {
            if (!empty($hotel->$field)) {
                $expolde = explode("/", $hotel->$field);
                $imageUrl = $expolde[1] . "/" . $expolde[2];
                if (Storage::exists($imageUrl)) {
                    Storage::delete($imageUrl);
                }
            }
        }
        Translation::deleteTranslations($hotel->toArray());
        $hotel->delete();
        return response()->json(["message" => "Hotel deleted successfully"], 200);
    }
}
