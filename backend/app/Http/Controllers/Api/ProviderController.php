<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProviders;
use App\Http\Requests\UpdateProviders;
use App\Models\Provider;
use App\Models\Map;
use Illuminate\Support\Facades\Storage;

class ProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $providers = Provider::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $providers], 200);
    }

    public function getProviders($provider)
    {
        $providers = Provider::query()
        ->where('status', 'Active')
        ->where('provider_for', $provider)
        ->select('id', 'name', 'logo');
        if($provider == "Webcams"){
            $providers->with(["$provider:id,provider_id,cameras as webcams"]);
        }else{
            $providers->with(["$provider:id,provider_id,photo,name,slug,country,height"]);
        }
        $providers = $providers->get();

        $map = Map::select('map_photo')->first();
        return response()->json([
            "message"=> "success",
            "data"=> [
            "providers"=>$providers,
            "map"=>$map
            ]
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProviders $request)
    {
        $data = $request->validated();
        if ($request->hasFile("logo")) {
            $photoUrl = "storage/" . $request->logo->store("provider");
            $data["logo"] = $photoUrl;
        }
        Provider::create($data);
        return response()->json(["success"=> true,"message"=> "Provider created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Provider $provider)
    {
        //if not found return 404
        if (!$provider) return response()->json(["message"=> "Provider not found",],422);
        return response()->json(["message"=> "success","data"=> $provider],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProviders $request, Provider $provider)
    {
        $data = $request->validated();
        if ($request->hasFile("logo")) {
            if(!empty($provider->logo)){
                $oldPath = str_replace("storage/", "", $provider->logo);
                if(Storage::exists($oldPath)){
                    Storage::delete($oldPath);
                }
            }
            $photoUrl = "storage/" . $request->logo->store("provider");
            $data["logo"] = $photoUrl;
        }
        $provider->update($data);
        return response()->json(["success"=> true,"message"=> "Provider updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Provider $provider)
    {
        //if not found return 404
        if (!$provider) return response()->json(["message"=> "Provider not found"],404);
        if(!empty($provider->logo)){
            $oldPath = str_replace("storage/", "", $provider->logo);
            if(Storage::exists($oldPath)){
                Storage::delete($oldPath);
            }
        }
        $provider->delete();
        return response()->json(["success"=> true,"message"=> "Provider deleted successfully"],200);
    }
}
