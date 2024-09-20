<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Http\Requests\UpdateServices;
use App\Models\SectionHeading;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::with([])->paginate(10);
        return response()->json(['message' => 'success', 'data' => $services],200);
    }

    public function Services()
    {
        $heading = SectionHeading::where("heading_for", "servcios-exclusivos")->first();
        $services = Service::where("status", "Active")->get();
        return response()->json(['message' => 'success', 'data' => $services, "heading" => $heading],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        $data = $request->only(["service_name","total_services","service_link","status"]);
        if($request->hasFile("service_image")){
            $service_image = "Storage/". $request->service_image->store("service-image");
            $data["service_image"] = $service_image;
        }
        Service::create($data);
        return response()->json(["success" => true, "message" => "Service created successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return response()->json(['message' => 'success', 'data' => $service],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServices $request, Service $service)
    {
        $data = $request->only(["service_name","total_services","service_link","status"]);
        if($request->hasFile("service_image")){
            $expolde = explode("/",$service->service_image);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
                $service_image = "Storage/". $request->service_image->store("service-image");
                $data["service_image"] = $service_image;
            }
        }
        $service->update($data);
        return response()->json(["success" => true, "message" => "Service updated successfully"],201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //$offerBanner = OfferBanner::where("id", $id)->first();
        if($service->service_image){
            $expolde = explode("/",$service->service_image);
            $imageUrl = $expolde[1]."/".$expolde[2];
            if(Storage::exists($imageUrl)){
                Storage::delete($imageUrl);
            }
        }
        $service->delete();
        return response()->json(["message" => "Service deleted successfully"],200);
    }
}
