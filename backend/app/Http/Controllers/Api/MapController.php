<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Map;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "map_photo"=>"required|mimes:jpg,jpeg,png,svg|max:5048",
        ]);
        if ($validate->fails()) {
            return response()->json(["errors"=>$validate->errors()],400);
        }
        $data = $validate->valid();
        if ($request->hasFile("map_photo")) {
            $path = "storage/".$request->file("map_photo")->store("map_photos");
            $data["map_photo"] = $path;
        }
        Map::create($data);
        return response()->json(["success"=>true,"message"=>"Map Photo uploaded successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $map = Map::first();
        return response()->json(["sucess"=>true,"data"=>$map],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Map $map)
    {
        $validate = Validator::make($request->all(), [
            "map_photo"=>"nullable|mimes:jpg,jpeg,png,svg|max:5048",
        ]);
        if ($validate->fails()) {
            return response()->json(["errors"=>$validate->errors()],400);
        }
        $data = $validate->valid();
        if ($request->hasFile("map_photo")) {
            $oldPath = str_replace("storage/", "", $map->map_photo);
            if(Storage::exists($oldPath)){
                Storage::delete($oldPath); 
            }
            $path = "storage/".$request->file("map_photo")->store("map_photos");
            $data["map_photo"] = $path;
        }
        $map->update($data);
        return response()->json(["success"=>true,"message"=>"Map photo updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Map $map)
    {
        //
    }
}
