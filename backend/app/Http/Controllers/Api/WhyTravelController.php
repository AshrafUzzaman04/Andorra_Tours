<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWhyTravel;
use App\Http\Requests\UpdateWhyTravel;
use App\Models\SectionHeading;
use App\Models\WhyTravel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WhyTravelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $whyTravels = WhyTravel::with([])->paginate(10);
        return response()->json(['success' => true, 'data' => $whyTravels]);
    }

    public function getWhyTravels()
    {
        $heading = SectionHeading::where("heading_for", "why-travels")->get();
        $whyTravels = WhyTravel::where("status", "Active")->get();
        return response()->json([
            'success' => true,
            'data' => [
                "heading" => $heading,
                "whyTravels" => $whyTravels
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWhyTravel $request)
    {
        $data = $request->validated();
        if ($request->hasFile("logo")) {
            $image = "storage/" . $request->logo->store("WhyTravel");
            $data['logo'] = $image;
        }
        WhyTravel::create($data);
        return response()->json(["success" => true, "message" => "Why Travel created successfully"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(WhyTravel $whyTravel)
    {
        return response()->json(["message" => "success", "data" => $whyTravel], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWhyTravel $request, WhyTravel $whyTravel)
    {
        $data = $request->validated();
        if ($request->hasFile("logo")) {
            if (!empty($whyTravel->logo)) {
                $expolde = explode("/", $whyTravel->logo);
                $expoldePath = $expolde[1] . "/" . $expolde[2];
                if (Storage::exists($expoldePath)) {
                    Storage::delete($expoldePath);
                }
            }
            $image = "storage/" . $request->logo->store("WhyTravel");
            $data['logo'] = $image;
        }
        $whyTravel->update($data);
        return response()->json(["success" => true, "message" => "Why Travel created successfully"], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WhyTravel $whyTravel)
    {
        if (!empty($whyTravel->logo)) {
            $expolde = explode("/", $whyTravel->logo);
            $expoldePath = $expolde[1] . "/" . $expolde[2];
            if (Storage::exists($expoldePath)) {
                Storage::delete($expoldePath);
            }
        }
        $whyTravel->delete();
        return response()->json(["success" => true, "message" => "Advertisement deleted successfully"], 200);
    }
}
