<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreResorts;
use App\Http\Requests\UpdateResorts;
use App\Models\Provider;
use App\Models\Resort;
use Illuminate\Support\Facades\Storage;

class ResortsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $resorts = Resort::with(['provider:id,name,logo'])->paginate(10);
        return response()->json(['success' => true, 'data' => $resorts]);
    }

    public function slugByResorts($slug)
    {
        $resort = Resort::where('slug', $slug)
        ->where("status", "Active")
        ->select(["photo", "name", "slug", "country","height","alpine_skiing","ski_lifts","clues","details_title","description"])
        ->first();
        if ($resort) {
            return response()->json(['success' => true, 'data' => $resort],200);
        }
        return response()->json(['success'=> false,'data'=> null],200);
    }
    public function create()
    {
        $resorts = Provider::where("provider_for", "Resorts")->get();
        return response()->json(['success'=> true,'data'=> $resorts],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResorts $request)
    {
        $data = $request->validated();
        if($request->hasFile('photo')) {
            $photoUrl = "storage/" . $request->photo->store("resorts");
            $data["photo"] = $photoUrl;
        }
        $data['provider_id'] = $request->providers;
        Resort::create($data);
        return response()->json(["success"=> true,"message"=> "Resort created successfully"],201);
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Resort $resort)
    {
        //if not found return 404
        if (!$resort) return response()->json(["message"=> "Resort not found",],422);
        return response()->json(["success"=> true,"data"=> $resort]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResorts $request, Resort $resort)
    {
        $data = $request->validated();
        if($request->hasFile('photo')) {
            if($resort->photo) {
                $oldPath = str_replace("storage/","",$resort->photo);
                if(Storage::exists($oldPath)) {
                    Storage::delete($oldPath);
                }
            }
            $photoUrl = "storage/" . $request->photo->store("resorts");
            $data["photo"] = $photoUrl;
        }
        $data['provider_id'] = $request->providers;
        $resort->update($data);
        return response()->json(["success"=> true,"message"=> "Resort updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resort $resort)
    {
        //if not found return 404
        if (!$resort) return response()->json(["message"=> "Resort not found",],422);
        $resort->delete();
        return response()->json(["success"=> true,"message"=> "Resort deleted successfully"]);
    }
}
