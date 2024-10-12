<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CardCategoryStore;
use App\Http\Requests\CardCategoryUpdate;
use App\Models\CardCategory;
use App\Models\SectionHeading;
use Illuminate\Http\Request;
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
        return response()->json(["message" => "success", "data" => $cardCategories, 'heading' => $heading],200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(CardCategoryStore $request)
    {
        $data = $request->validated();
        if($request->hasFile("image")){
            $image = "storage/".$request->image->store("card-image");
            $data['image'] = $image;
        }

        if($request->hasFile("tag")){
            $tag = "storage/".$request->tag->store("card-image");
            $data['tag'] = $tag;
        }
        CardCategory::create($data);
        return response()->json(['success'=> true, "message"=> "Card category created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CardCategory $cardCategory)
    {
        return response()->json(["message" => "success", "data" => $cardCategory],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CardCategoryUpdate $request, CardCategory $cardCategory)
    {
        //dd($cardCategory);
        $data = $request->validated();
        if($request->hasFile("image")){
            $expolde = explode("/",$cardCategory->image);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
                $image = "storage/".$request->image->store("card-image");
                $data['image'] = $image;
            }
            
        }

        if($request->hasFile("tag")){
            $expolde = explode("/",$cardCategory->tag);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
                $tag = "storage/".$request->tag->store("card-image");
                $data['tag'] = $tag;
            }
            
        }
        $cardCategory->update($data);
        return response()->json(['success'=> true, "message"=> "Card category updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CardCategory $cardCategory)
    {
        if($cardCategory->image){
            $expolde = explode("/",$cardCategory->image);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
            }
        }
        if($cardCategory->tag){
            $expolde = explode("/",$cardCategory->tag);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
            }
        }
        $cardCategory->delete();
        return response()->json(["message" => "Card category deleted successfully"],200);
    }
}
