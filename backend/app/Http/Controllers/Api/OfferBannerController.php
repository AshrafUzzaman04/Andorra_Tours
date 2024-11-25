<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OfferBannerRequest;
use App\Models\OfferBanner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class OfferBannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offerBanners = OfferBanner::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $offerBanners],200);
    }

    public function Promotion()
    {
        $offerBanners = OfferBanner::where("status", "Active")->get();
        return response()->json(["message" => "success", "data" => $offerBanners],200);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(OfferBannerRequest $request)
    {
        $data = $request->only(["banner_title","banner_title_color","button_text","button_color","button_text_color","button_link","status"]);
        if($request->hasFile("banner_image")){
            $banner_image = "storage/". $request->banner_image->store("banner_image");
            $data["banner_image"] = $banner_image;
        }
        OfferBanner::create($data);
        return response()->json(["success" => true, "message" => "Promotion created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(OfferBanner $offerBanner, $id)
    {   $offerBanner = OfferBanner::where("id", $id)->first();
        return response()->json(["message" => "success", "data" => $offerBanner],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OfferBanner $offerBanner,$id)
    {
        $offerBanner = OfferBanner::where("id", $id)->first();
        $data = $request->only(["banner_title","banner_title_color","button_text","button_color","button_text_color","button_link","status"]);
        if($request->hasFile("banner_image")){
            $expolde = explode("/",$offerBanner->banner_image);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
                $banner_image = "storage/". $request->banner_image->store("banner_image");
                $data["banner_image"] = $banner_image;
            }
        }
        $offerBanner->update($data);
        return response()->json(["success" => true, "message" => "Promotion updated successfully"],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OfferBanner $offerBanner, $id)
    {
        $offerBanner = OfferBanner::where("id", $id)->first();
        if($offerBanner->banner_image){
            $expolde = explode("/",$offerBanner->banner_image);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
            }
        }
        $offerBanner->delete();
        return response()->json(["message" => "Promotion deleted successfully"],200);
    }
}
