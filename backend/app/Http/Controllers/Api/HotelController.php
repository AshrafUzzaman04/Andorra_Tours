<?php

namespace App\Http\Controllers\Api;

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
        $hotels = Hotel::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $hotels], 200);
    }

    public function create()
    {
        $categories = CardCategory::all();
        return response()->json(["success" => true,"categories"=> $categories],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreHotelRequest $request)
    {
        $data = $request->validated();
        if($request->hasFile("photo")){
            $imagePath = $request->photo->store("hotel");
            $data["photo"] = $imagePath;
        }
        if($request->hasFile("photo_one")){
            $imagePath = $request->photo->store("hotel");
            $data["photo_one"] = $imagePath;
        }
        if($request->hasFile("photo_two")){
            $imagePath = $request->photo->store("hotel");
            $data["photo_two"] = $imagePath;
        }
        if($request->hasFile("photo_three")){
            $imagePath = $request->photo->store("hotel");
            $data["photo_three"] = $imagePath;
        }
        $data['categorie_id'] = $request->categorie;
        Hotel::create($data);
        return response()->json(["success" => true,"message"=> "Hotel created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hotel $hotel)
    {
        if (!$hotel) return response()->json(["message" => "Hotel not found",], 422);
        return response()->json(["message" => "success", "data" => $hotel], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateHotelRequest $request, Hotel $hotel)
    {
        $data = $request->validated();
        if($request->hasFile("photo")){
            $expolde = explode("/", $hotel->photo);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
            $imagePath = $request->photo->store("hotel");
            $data["photo"] = $imagePath;
        }
        if($request->hasFile("photo_one")){
            $expolde = explode("/", $hotel->photo_one);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
            $imagePath = $request->photo->store("hotel");
            $data["photo_one"] = $imagePath;
        }
        if($request->hasFile("photo_two")){
            $expolde = explode("/", $hotel->photo_two);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
            $imagePath = $request->photo->store("hotel");
            $data["photo_two"] = $imagePath;
        }
        if($request->hasFile("photo_three")){
            $expolde = explode("/", $hotel->photo_three);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
            $imagePath = $request->photo->store("hotel");
            $data["photo_three"] = $imagePath;
        }
        $data['categorie_id'] = $request->categorie;
        $hotel->update($data);
        return response()->json(["success" => true,"message"=> "Hotel created successfully"],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hotel $hotel)
    {
        if (!empty($hotel->photo)) {
            $expolde = explode("/", $hotel->photo);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }
        if (!empty($hotel->photo_one)) {
            $expolde = explode("/", $hotel->photo_one);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }
        if (!empty($hotel->photo_two)) {
            $expolde = explode("/", $hotel->photo_two);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }

        if (!empty($hotel->photo_three)) {
            $expolde = explode("/", $hotel->photo_three);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }

        $hotel->delete();
        return response()->json(["message" => "Hotel deleted successfully"], 200);
    }
}
