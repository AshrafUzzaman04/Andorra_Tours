<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SectionHeading;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SectionHeadingController extends Controller
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
        $sectionHeading = SectionHeading::where('heading_for',$request->heading_for)->first();
        if(!empty($sectionHeading)) {
            $validatedUpdate = Validator::make($request->all(), [
                "heading_for"=> "required|string|unique:section_headings,heading_for,".$sectionHeading->id,
                "heading"=> "required|string|unique:section_headings,heading,".$sectionHeading->id,
                "sub_heading"=> "nullable|string",
                "status"=> "nullable|string|in:Active,Inactive",
            ]);
            if($validatedUpdate->fails()) {
                return response()->json(["error" => $validatedUpdate->errors()],422);
            }
            $data = $validatedUpdate->valid();
            $sectionHeading->update($data);
            return response()->json(['success' => true, 'message' => "Heading updated successfully"],200);
        }else{
            $validatedStore = Validator::make($request->all(), [
                "heading_for"=> "required|string|unique:section_headings,heading_for",
                "heading"=> "required|string|unique:section_headings,heading",
                "sub_heading"=> "nullable|string",
                "status"=> "nullable|string|in:Active,Inactive",
            ]);
            if($validatedStore->fails()) {
                return response()->json(["error" => $validatedStore->errors()],422);
            }
            $data = $validatedStore->valid();
            SectionHeading::create($data);
            return response()->json(['success' => true, 'message' => "Heading created successfully"],201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $heading_for)
    {
        $sectionHeading = SectionHeading::where('heading_for',$heading_for)->first();
        return response()->json(['success' => true, "data" => $sectionHeading],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
