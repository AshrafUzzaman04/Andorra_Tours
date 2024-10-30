<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWebcams;
use App\Http\Requests\UpdateWebcams;
use App\Models\Provider;
use App\Models\Webcam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WebcamsController extends Controller
{
    /**
     * Display a listing of the resource.
    */
    public function index()
    {
        $webcams = Webcam::with(['provider:id,name,logo'])->paginate(10);
        return response()->json(['success' => true, 'data' => $webcams],200);
    }

    public function create()
    {
        $providers = Provider::where("provider_for", "Webcams")->get();
        return response()->json(['success'=> true,'data'=> $providers],200);
    }

    public function webCams()
    {
        $webcams = Webcam::with([])->get();
        return response()->json(['success' => true, 'data' => $webcams],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWebcams $request)
    {
        $data = $request->validated();
        if($request->hasFile('map')) {
            $path = "storage/".$request->file('map')->store('webcams');
            $data['map'] = $path;
        }
        $data['provider_id'] = $request->providers;
        Webcam::create($data);
        return response()->json(['success'=> true, "message" => "Webcam created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Webcam $webcam)
    {
        //if not found return 404
        if (!$webcam) return response()->json(["message"=> "Webcam not found",],422);
        return response()->json(["success"=> true,"data"=> $webcam]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWebcams $request, Webcam $webcam)
    {
        $data = $request->validated();
        if($request->hasFile('map')) {
            if(!empty($webcam->map)){
                $oldPath = str_replace('storage/',  "",$webcam->map);
                if(Storage::exists($oldPath)){
                    Storage::delete($oldPath);
                }
            }
            $path = "storage/".$request->file('map')->store('webcams');
            $data['map'] = $path;
        }
        $data['provider_id'] = $request->providers;
        $webcam->update($data);
        return response()->json(["success" => true, "message" => "Webcam updated successfully"],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Webcam $webcam)
    {
        //if not found return 404
        if (!$webcam) return response()->json(["message"=> "Webcam not found",], 422);
        if(!empty($webcam->map)){
            $oldPath = str_replace('storage/',  "",$webcam->map);
            if(Storage::exists($oldPath)){
                Storage::delete($oldPath);
            }
        }
        $webcam->delete();
        return response()->json(["success" => true, "message" => "Webcam deleted successfully"],200);
    }
}
