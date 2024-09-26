<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VeranoRequest;
use App\Models\SectionHeading;
use App\Models\Verano;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VeranoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $veranos = Verano::with([])->paginate(10);
        return response()->json(["message" => "success", "data" => $veranos], 200);
    }

    public function Verano()
    {
        $heading = SectionHeading::where("heading_for", "verano")->first();
        $veranos = Verano::with([])->get();
        return response()->json(["message" => "success", "data" => $veranos, "heading" => $heading], 200);
    }

    public function VeranoBySlug($slug)
    {
        $verano = Verano::where("slug", $slug)->with(['details'])->first();
        return response()->json(["success" => true, "data" => $verano],200);
    }

    public function create()
    {
        $veranos = Verano::where("status", "Active")->get();
        return response()->json(["success" => true, "data" => $veranos],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VeranoRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile("photo")) {
            $photoUrl = "storage/" . $request->photo->store("verano-image");
            $data["photo"] = $photoUrl;
        }
        Verano::create($data);
        return response()->json(["message" => "Verano created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Verano $verano)
    {
        //$verano = Verano::where()with([])->first();
        return response()->json(["message" => "success", "data" => $verano], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VeranoRequest $request, Verano $verano)
    {
        $data = $request->validated();
        if ($request->hasFile("photo")) {
            $expolde = explode("/", $verano->photo);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
                $photoUrl = "storage/" . $request->photo->store("verano-image");
                $data["photo"] = $photoUrl;
            }
        }
        $verano->update($data);
        return response()->json(["message" => "Verano updated successfully"], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Verano $verano)
    {
        if ($verano->photo) {
            $expolde = explode("/", $verano->photo);
            $imageUrl = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($imageUrl)) {
                Storage::delete($imageUrl);
            }
        }
        $verano->delete();
        return response()->json(["message" => "Verano deleted successfully"], 200);
    }
}
