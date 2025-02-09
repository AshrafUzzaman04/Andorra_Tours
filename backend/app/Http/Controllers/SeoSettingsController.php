<?php

namespace App\Http\Controllers;

use App\Http\Requests\SeoSettingRequest;
use App\Models\SeoSettings;
use Illuminate\Http\Request;

class SeoSettingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $seoSettings = SeoSettings::with([])->paginate(10);

        return response()->json(["message" => "success", "data" => $seoSettings], 200);
    }

    public function getByPageName(string $seoSettingsPageName)
    {
        if ($seoSettings = SeoSettings::where("page_name", $seoSettingsPageName)->first()) {
            return response()->json(["message" => "success", "data" => $seoSettings], 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SeoSettingRequest $request)
    {
        $data = $request->validated();

        $created = SeoSettings::create($data);
        if ($created) {
            return response()->json(["message" => "Seo Settings created successfully!"], 200);
        } else {
            return response()->json(["message" => "Data not saved!"], 501);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $seoSettings)
    {
        if ($seoSettings = SeoSettings::with([])->find($seoSettings)) {
            return response()->json(["message" => "success", "data" => $seoSettings], 200);
        }

        return response()->json(["message" => "Data not found!"], 501);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $seoSettings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SeoSettingRequest $request, int $seoSettings)
    {
        if ($seoSettings = SeoSettings::find($seoSettings)) {

            $data = $request->validated();
            $seoSettings->update($data);

            return response()->json(["message" => "Seo settings updated successful!"], 200);
        } else {
            return response()->json(["message" => "Data not found!"], 501);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $seoSettings)
    {
        if ($seoSettings = SeoSettings::find($seoSettings)) {
            $seoSettings->delete();
            return response()->json(['message' => "Seo Settings delete successfully"], 200);
        }

        return response()->json(["message" => "Seo Settings not found",], 422);
    }
}
