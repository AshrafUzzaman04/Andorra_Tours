<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FooterDetails;
use App\Models\Header;
use App\Models\PageCategory;
use App\Models\Partner;
use App\Models\SocialLink;
use Illuminate\Http\Request;

class FooterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $footerLogo = Header::first();
        $footerDetails = FooterDetails::all();
        $footerPages = PageCategory::with(['pages:id,page_name,page_slug,page_title,category'])->where("status","Active")->get();
        $partners = Partner::where("status","Active")->get();
        $socialLinks = SocialLink::where("status","Active")->get();
        return response()->json(['success' => true, "data" => [
            'footerDetails' => $footerDetails,
            'footerPages' => $footerPages,
            'partners' => $partners,
            'socialLinks' => $socialLinks,
            'footerLogo' => $footerLogo
        ]]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
