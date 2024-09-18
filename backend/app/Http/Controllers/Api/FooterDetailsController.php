<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterDetails;
use Illuminate\Http\Request;

class FooterDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $footerDetails = FooterDetails::first();
        return response()->json(['success' => true, 'data' => $footerDetails]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $footerDetails = FooterDetails::first();
        $data = $request->only(['location','schedule','email','help_number','copyright','contact_title','status']);
        if(!empty($footerDetails)){
            $footerDetails->update($data);
            return response()->json(['success' => true, "message" => "Details updated successfully"],200);
        }
        FooterDetails::create($data);
        return response()->json(['success' => true, "message" => "Details updated successfully"],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(FooterDetails $footerDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FooterDetails $footerDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FooterDetails $footerDetails)
    {
        //
    }
}
