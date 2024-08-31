<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\InveranoRequest;
use App\Models\Inverano;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InveranoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $veranos = Inverano::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $veranos],200);
    }

    public function Inverano()
    {
        $inveranos = Inverano::with([])->get();
        return response()->json(["message" => "success", "data" => $inveranos],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InveranoRequest $request)
    {
        $data = $request->only(["label","reviews","reviews_link","title","price","booking_link","status","total_reviews"]);
        if($request->hasFile("photo")){
            $photoUrl = "storage/".$request->photo->store("inverano-image");
            $data["photo"] = $photoUrl;
        }
        Inverano::create($data);
        return response()->json(["message" => "Inverano created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Inverano $inverano)
    {
        //$verano = Verano::where()with([])->first();
        return response()->json(["message" => "success", "data" => $inverano],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InveranoRequest $request, Inverano $inverano)
    {
        $data = $request->only(["label","reviews","reviews_link","title","price","booking_link","status","total_reviews"]);
        if($request->hasFile("photo")){
            $expolde = explode("/",$inverano->photo);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
                $photoUrl = "storage/".$request->photo->store("verano-image");
                $data["photo"] = $photoUrl;
            }
        }
        $inverano->update($data);
        return response()->json(["message" => "Inverano updated successfully"],200);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inverano $inverano)
    {
        if($inverano->photo){
            $expolde = explode("/",$inverano->photo);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
            }
        }
        $inverano->delete();
        return response()->json(["message" => "Inverano deleted successfully"],200);
    }
}